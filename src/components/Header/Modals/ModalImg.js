import Modal from 'react-bootstrap/Modal';
const ModalImg = (props) => {
    const { show, setShow, src } = props;
    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            className="modalQR"
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body style={{ display: 'flex' }}>
                <img
                    src={src}
                    style={{ width: '60%', margin: 'auto', minHeight: '100px', maxHeight: '300px', objectFit: 'contain' }}
                />
            </Modal.Body>
        </Modal>
    )
}
export default ModalImg