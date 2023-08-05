import React from "react";
import { Table } from "react-bootstrap";

const ClientSearch = ({ searchResults }) => {
    if (!searchResults) {
        searchResults = []; // Assign an empty array if searchResults is undefined
    }

    return (
        <Table striped bordered hover>
            {/* Table header */}
            <thead>
                <tr>
                    <th>#</th>
                    <th>الاسم</th>
                    <th>البريد الإلكتروني</th>
                    <th>رقم الهاتف</th>
                </tr>
            </thead>

            {/* Table body */}
            <tbody>
                {searchResults.map((client, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ClientSearch;
