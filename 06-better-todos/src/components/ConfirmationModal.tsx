import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface IProps {
    children: React.ReactNode
    onCancel: () => void
    onConfirm: () => void
    show: boolean
}

const ConformationModal: React.FC<IProps> = ({ children, onCancel, onConfirm, show }) => {


return (
  <>
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="warning" onClick={onConfirm}>
          Comfirm
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);
}

export default ConformationModal
