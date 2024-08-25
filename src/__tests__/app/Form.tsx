import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from '@/app/sections'

it('This is a test to check if the title of the form exists', () => {
  render(<Form />)
  expect(screen.getByText(/NewsLetter/i)).toBeInTheDocument();
})


describe('Check if the label of the inputs exists', () => {
  it('This is a test to check if the name label exist', () => {
    render(<Form />)
    expect(screen.getByText(/full name/i)).toBeInTheDocument();
  })

  it('This is a test to check if the email label exist', () => {
    render(<Form />)
    expect(screen.getByText(/email/i)).toBeInTheDocument();
  })

  it('This is a test to check if the textarea label exist', () => {
    render(<Form />)
    expect(screen.getByText(/message/i)).toBeInTheDocument();
  })
})

