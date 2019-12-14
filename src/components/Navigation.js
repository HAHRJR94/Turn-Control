import React from 'react';

const Navigation = ({ atendidos, cola, transMayor }) => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="text-white">
                    Atendidos:
                    <span className="badge badge-pill badge-success ml-2">{atendidos}</span>
                </div>
                <div className="text-white">
                    <h5>
                        <span className="badge badge-pill badge-primary">
                            Control de turno
                    </span>
                    </h5>
                </div>
                <div className="text-white">
                    Cola:
                    <span className="badge badge-pill badge-danger ml-2">{cola}</span>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;