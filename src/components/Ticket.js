import React from 'react';

const Ticket = ({ title, nTicket}) => {
    return (
        <div className="col-md-4">
            <div className="card mt-4">
                <div className="card-header text-white bg-primary">
                    <p>{title}</p>
                </div>
                <div className="card-body text-success">
                    <h3>{nTicket}</h3>
                </div>
            </div>
        </div>
    );
};

export default Ticket;