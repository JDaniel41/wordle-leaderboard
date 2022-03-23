import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";

export default function InputForm({
    updateName,
    updateWordle,
    updatePin,
    handleSubmit,
}) {
    return (
        <Form className="m-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>What is your name?</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="John Doe"
                    onChange={(event) => updateName(event.target.value)}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Paste your worldle output here:</Form.Label>
                <Form.Control
                    as="textarea"
                    type="text"
                    size="lg"
                    onChange={(event) => updateWordle(event.target.value)}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>What is your pin?</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="1234"
                    onChange={(event) => updatePin(event.target.value)}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
}
