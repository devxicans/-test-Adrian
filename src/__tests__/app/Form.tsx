import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from '@/app/sections'
import fetchMock from 'jest-fetch-mock'
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn() as jest.Mock,
    error: jest.fn() as jest.Mock,
  },
}));


describe('Form Component', () => {

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the form correctly', () => {
    render(<Form />)

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty on submit', async () => {
    render(<Form />);

    fireEvent.click(screen.getByText(/Send/i));

    await waitFor(() => {
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
    });
  });

  it('shows email validation error if email is invalid', async () => {
    render(<Form />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByText(/Send/i));

    await waitFor(() => {
      expect(screen.getByText(/Email is not valid/i)).toBeInTheDocument();
    });
  });

  it('submits the form successfully and shows success message', async () => {

    render(<Form />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello World' } });

    fireEvent.click(screen.getByText(/Send/i));

    await waitFor(() => {
      expect(toast.success);
    });
  });

  it('shows error message if API call fails', async () => {

    render(<Form />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello World' } });

    fireEvent.click(screen.getByText(/Send/i));

    await waitFor(() => {
      expect(toast.error);
    });
  });
})