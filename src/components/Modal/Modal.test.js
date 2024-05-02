import { render, fireEvent, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import Modal from "./Modal";

describe("Modal component", () => {
  let handleBtn

  beforeEach(() => {
    handleBtn = jest.fn();
  })

  afterEach(() => {
    cleanup();
  })

  test("should open modal with close button and message", () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => { }} message="Test message" />
    );
    expect(getByText("Test message")).toBeInTheDocument();
    expect(getByText("×")).toBeInTheDocument();
  });

  test("should close when button is clicked", () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={handleBtn} message="Test message" />
    );
    fireEvent.click(getByText("×"));
    expect(handleBtn).toHaveBeenCalledTimes(1);
  });

  test("should confirm when button is clicked", () => {
    const { getByText } = render(
      <Modal
        isOpen={true}
        onClose={() => { }}
        onConfirm={handleBtn}
        message="Test message"
      />
    );
    fireEvent.click(getByText("Confirm"));
    expect(handleBtn).toHaveBeenCalledTimes(1);
  });

  test("should close when Cancel button is clicked", () => {
    const { getByText } = render(
      <Modal
        isOpen={true}
        onClose={handleBtn}
        onConfirm={() => { }}
        message="Test message"
      />
    );
    fireEvent.click(getByText("Cancel"));
    expect(handleBtn).toHaveBeenCalledTimes(1);
  });
});
