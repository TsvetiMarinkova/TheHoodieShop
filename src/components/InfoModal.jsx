import Modal from "react-bootstrap/Modal";

//creating the information modal using bootstrap
function InfoModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delivery options - Choose what works best for you!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Standard Delivery (3-5 days) - £3.99</h5>
        <ul>
          <li>Affordable and reliable option for non-urgent orders.</li>
          <li>
            Delivered within <strong>3 to 5 working days</strong>.
          </li>
          <li>Tracking available with estimated delivery updates.</li>
        </ul>

        <h5>Express Delivery (1-2 days) - £7.99</h5>
        <ul>
          <li>Faster shipping for those who need their order quickly.</li>
          <li>
            Delivered within <strong>1 to 2 working days</strong>.
          </li>
          <li>Priority handling and tracking included.</li>
        </ul>

        <h5>Next Day Delivery - £12.99</h5>
        <ul>
          <li>Fastest option for urgent orders.</li>
          <li>
            Guaranteed <strong>next working day</strong> delivery if ordered
            before 4 PM.
          </li>
          <li>Full tracking and real-time updates available.</li>
        </ul>

        <h5>Additional Notes:</h5>
        <ul>
          <li>Orders placed after 4 PM will be processed the next day.</li>
          <li>
            Deliveries are made Monday to Saturday (excluding public holidays).
          </li>
          <li>Currently, we only deliver within the UK.</li>
        </ul>
      </Modal.Body>
    </Modal>
  );
}

export default InfoModal;
