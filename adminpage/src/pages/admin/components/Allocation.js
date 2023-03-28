import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Allocation = (props) => {
  const { allocations, handleAddAllocation, handleDeleteAllocationRow } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [allocation, setAllocation] = useState({});

  const handleOnChnage = (e, evname) => {
    setAllocation({ ...allocation, [evname]: e.target.value });
  };

  const handleSaveBtn = () => {
    handleAddAllocation(allocation);
    handleClose();
  };

  return (
    <div className="py-3">
      <div className="row">
        <div className="col-md-12 mx-auto">
          <div className="card">
            <div className="card-header">
              <button onClick={handleShow} className="btn btn-primary btn-sm">
                Add Row
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table mb-0 pp-table-info">
                  <tbody>
                    <tr className="card-header" style={{ border: "none" }}>
                      <td>No</td>
                      <td>Token Allocation</td>
                      <td>Date</td>
                      <td>Token(s) Claimed</td>
                      <td>Action</td>
                      <td></td>
                    </tr>
                    {Boolean(allocations) &&
                      Object.values(allocations).map((allocation, ind) => {
                        return (
                          <tr>
                            <td>{allocation.no}</td>
                            <td>{allocation.token_allocation}</td>
                            <td>{allocation.date}</td>
                            <td>{allocation.token_claimed}</td>
                            <td>{allocation.action}</td>
                            <td>
                              <button
                                onClick={() =>
                                  handleDeleteAllocationRow(
                                    Object.keys(allocations)[ind]
                                  )
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>No</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleOnChnage(e, "no")}
                placeholder="1"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Token Allocation</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleOnChnage(e, "token_allocation")}
                placeholder="100"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>date</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleOnChnage(e, "date")}
                placeholder="2021-12-10 12:45:00 UTC"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Token(s) Claimed</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleOnChnage(e, "token_claimed")}
                placeholder="100"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Action</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleOnChnage(e, "action")}
                placeholder="Claim"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveBtn}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Allocation;
