import Modal from "./Modal";
import { API_BASE_URL } from "../services/api";
function ModelDetailsModel({ model, onClose }) {
    return(
        <Modal onClose={onClose}>
            <div className="text-center mb-4">

                <img
                    src={`${API_BASE_URL}${model.image}`}
                    style={{ width: "200px" }}
                />
                <h4 className="mt-3">{model.name}</h4>
            </div>

            <table className="table">
                <tbody>
                    <tr>
                        <th>Release Year</th>
                        <td>{model.release_year}</td>
                    </tr>
                    <tr>
                        <th>Model Numbers</th>
                        <td>{model.model?.join(", ")}</td>
                    </tr>
                </tbody>
            </table>

        </Modal>
    );
};

export default ModelDetailsModel;