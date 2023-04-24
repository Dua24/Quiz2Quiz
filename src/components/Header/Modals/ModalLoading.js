import Modal from 'react-bootstrap/Modal';
import ReactLoading from 'react-loading';
const ModalLoading = (props) => {
    const { show, setShow } = props;
    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            className="modalLoading"
        >
            <ReactLoading className="loadwait" type={"spin"} color="#1e88e5" />
        </Modal>
    )
}
export default ModalLoading