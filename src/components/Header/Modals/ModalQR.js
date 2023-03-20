import Modal from 'react-bootstrap/Modal';
import appstore from "../../../assets/logo/appstore.svg"
import ggplay from "../../../assets/logo/ggplay.svg"
import appQr from "../../../assets/RedRedQr.png"
const ModalQR = (props) => {
    const { show, setShow } = props;
    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            className="modalQR"
        >
            <Modal.Header closeButton>
                <Modal.Title>Get the RedRed app</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="title-body">Scan this QR code to download the web local now</div>
                <div className="qr">
                    <img src={appQr} />
                </div>
                <div className="checkout">
                    <span className="title-checkout">Or check it out in the app stores</span>
                    <div className="options">
                        <a href="#">
                            <img src={appstore} />
                        </a>
                        <a href="#">
                            <img src={ggplay} />
                        </a>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default ModalQR