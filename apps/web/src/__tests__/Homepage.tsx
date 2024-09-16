import { render, screen } from "@testing-library/react"
import Home from "@/app/page"


describe('Home Page', () => {
  it('should contain a header', () => {
    render(<Home />)
    const heading = screen.getByTitle('heading');

    expect(heading).toBeInTheDocument();
  })

  it('should contain a text inside my header', () => {
    render(<Home />)
    const logo = screen.getByText(/adrian covarrubias/i);

    expect(logo).toBeInTheDocument();
  })

  it('should contain a text inside my Links Elements', () => {
    render(<Home />)
    const logo = screen.getByText(/18/i);

    expect(logo).toBeInTheDocument();
  })
})

