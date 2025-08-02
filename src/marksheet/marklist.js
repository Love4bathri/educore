import axios from 'axios';
 
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
function Marklist() {
    const [data, SetData] = useState([]);
    const url = "http://localhost:7000/api/mark";
    const [msg, setMsg] = useState("");

    async function handleApi() {
        try {
            let response = await axios.get(url);
            SetData(response.data);
            console.log(response.data);
        } catch (err) {
            setMsg("server error")
        }

    }

    useEffect(() => {
        handleApi();
    }, [])

    async function handleDelete(id) {
        await axios.delete(url + "/" + id);
        handleApi();
    }

    return (
        <div className="container">
            {
                msg
            }
            <h2 className="my-4">Marksheet List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>studentId</th>
                        <th>rollNo</th>
                        <th>physics</th>
                        <th>chemistry</th>
                        <th>maths</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((ele, index) => (
                        <tr key={ele._id}>
                            <td>{index + 1}</td>
                            <td>{ele.name}</td>
                            <td>{ele.studentId}</td>
                            <td>{ele.rollNo}</td>
                            <td>{ele.physics}</td>
                            <td>{ele.chemistry}</td>
                            <td>{ele.maths}</td>
                            <td>
                                <Link to={`/marksheetadd/${ele._id}`} className="btn btn-sm btn-primary me-2">Edit</Link>

                                <button onClick={() => handleDelete(ele._id)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Marklist