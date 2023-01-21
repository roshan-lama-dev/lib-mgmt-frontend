import React, { useEffect, useState } from "react"
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap"
import DashboardLayout from "../components/layout/DashboardLayout"
import { toast } from "react-toastify"
import {
  editProfile,
  getUserDetails,
  updatePassword,
} from "../helpers/axiosHelper"

const initialState = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
}
const Profile = () => {
  const [user, setUser] = useState({})
  const [updatePassForm, setUpdatePassForm] = useState(initialState)
  const [updateDetailsForm, setUpdateDetailsForm] = useState()
  const [showForm, setShowForm] = useState(false)
  const [showPassForm, setShowPassForm] = useState(false)

  useEffect(() => {
    const u = JSON.parse(sessionStorage.getItem("user"))
    setUser(u)
  }, [])

  const handleOnPassChange = (e) => {
    const { name, value } = e.target

    setUpdatePassForm({
      ...updatePassForm,
      [name]: value,
    })
  }

  const submitUpdatePass = async (e) => {
    e.preventDefault()
    const { currentPassword, password, confirmPassword } = updatePassForm

    if (confirmPassword !== password) {
      return toast.error("Password does not match!")
    }

    const { status, message } = await updatePassword({
      currentPassword,
      password,
    })
    setUpdatePassForm(initialState)
    toast[status](message)
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setUpdateDetailsForm({
      ...updateDetailsForm,
      [name]: value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (window.confirm("Are you sure you want to edit your profile details?")) {
      const { status, message } = await editProfile(updateDetailsForm)

      toast[status](message)
      const updatedUser = await getUserDetails()

      sessionStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
      setShowForm(false)
    }
  }

  return (
    <DashboardLayout>
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="p-3">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fName"
                  value={updateDetailsForm?.fName}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lName"
                  onChange={handleOnChange}
                  value={updateDetailsForm?.lName}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  disabled
                  value={updateDetailsForm?.email}
                />
              </Form.Group>
              <Button variant="warning" type="submit">
                Update Details
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showPassForm} onHide={() => setShowPassForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="p-3">
            <Form onSubmit={submitUpdatePass}>
              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  placeholder="Enter your current password"
                  value={updatePassForm.currentPassword}
                  onChange={handleOnPassChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter a password"
                  onChange={handleOnPassChange}
                  value={updatePassForm.password}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  onChange={handleOnPassChange}
                  value={updatePassForm.confirmPassword}
                />
              </Form.Group>
              <Button variant="warning" type="submit">
                Update Password
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
      <Container>
        <Row className="p-5">
          <Col md={8}>
            <div className="profile-left">
              <ul>
                <li>
                  <strong>Profile ID:</strong> {user?._id}
                </li>
                <li>
                  <strong>Name:</strong> {`${user?.fName} ${user?.lName}`}
                </li>
                <li>
                  <strong>Email:</strong> {user?.email}
                </li>
                <li>
                  <strong>Status</strong>{" "}
                  <span
                    className={
                      user?.status === "active" ? "text-success" : "text-danger"
                    }
                  >
                    {" "}
                    {user?.status}
                  </span>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={4} className="d-flex flex-column gap-4">
            <Button variant="warning" onClick={() => setShowForm(true)}>
              Edit Details
            </Button>
            <Button variant="dark" onClick={() => setShowPassForm(true)}>
              Update Password
            </Button>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  )
}

export default Profile
