import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Ticket from './components/Ticket';
import Form from './components/Form';
import './App.css';


class App extends Component {
    constructor() {
        super();

        //Valores con los que inicializará la app
        this.state = {
            controlTurno: [],
            terceraEdad: [],
            servicioCliente: [],
            clienteNormal: [],
            empresarial: [],
            currentTicket: {},
            cola: 0,
            atendidos: 0
        }

        // Declaramos la funcion para que no pierda el valor
        this.handleAddTicket = this.handleAddTicket.bind(this)
    }

    // Agrega un nuevo ticket
    handleAddTicket(ticket) {
        const { terceraEdad, servicioCliente, clienteNormal, empresarial } = this.state;

        let newControlTurnos = [];
        const newTiket = { nTicket: ticket.nTicket, title: ticket.title }; //Objeto que contiene el número de ticket y el título

        //Usamos Spread Operator para extraer las propiedades de cada array.
        //newControlTurnos obtiene una copia de las propiedades del array y lo pasamos a controlTurno. 
        if (ticket.title === 'Tercera edad') {
            newControlTurnos = [...terceraEdad, newTiket];
            this.setState({ controlTurno: [...newControlTurnos, ...clienteNormal, ...empresarial, ...servicioCliente], terceraEdad: newControlTurnos })
        }

        if (ticket.title === 'Empresarial') {
            newControlTurnos = [...empresarial, newTiket];
            this.setState({ controlTurno: [...terceraEdad, ...clienteNormal, ...newControlTurnos, ...servicioCliente], empresarial: newControlTurnos })
        }

        if (ticket.title === 'Cliente normal') {
            newControlTurnos = [...clienteNormal, newTiket];
            this.setState({ controlTurno: [...terceraEdad, ...newControlTurnos, ...empresarial, ...servicioCliente], clienteNormal: newControlTurnos })
        }

        if (ticket.title === 'Servicio al cliente') {
            newControlTurnos = [...servicioCliente, newTiket];
            this.setState({ controlTurno: [...terceraEdad, ...clienteNormal, ...empresarial, ...newControlTurnos], servicioCliente: newControlTurnos })
        }


    }

    //Funcion para pasar un nuevo ticket a ventanilla.
    handleNextTicketOnClick = () => {
        const { controlTurno, atendidos } = this.state;
        if (!controlTurno.length) {
            return;
        }

        this.setState({
            currentTicket: controlTurno[0],
            controlTurno: controlTurno.slice(1, controlTurno.length), //Elimina un ticket de la lista
            atendidos: atendidos + 1, //Muestra el número de tickets que han sido atendidos
            cola: controlTurno.length - 1, //Muestra los tickets que estan en cola
        });
        debugger
    }


    render() {
        const { controlTurno, currentTicket } = this.state;

        // Recorremos el arreglo antes de renderizarlo
        const tickets = controlTurno.map(ticket =>
            <Ticket
                key={ticket.nTicket}
                title={ticket.title}
                nTicket={ticket.nTicket}
            />
        );


        return (
            <div className="App">

                <Navigation
                    atendidos={this.state.atendidos}
                    cola={this.state.cola}
                    transMayor={this.state.transMayorDemanda}
                />
                <div className="container">
                    <section className="row mt-4">
                        <div>
                            <Form onAddTicket={this.handleAddTicket} />
                        </div>
                        <div className="card-body justify-content-md-center">
                            {/* Devuelve un array de string que representa todas las propiedades del objeto */}
                            {Object.keys(currentTicket).length > 0 && <Ticket
                                nTicket={currentTicket.nTicket}
                                title={currentTicket.title}
                            />}
                            <div className="card-footer">
                                {/* Llama al siguiente ticket a ventanilla */}
                                <button className="btn btn-primary" onClick={this.handleNextTicketOnClick}
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </section>
                    <section className="row">
                        {/* Muestra los tickets que estan en cola */}
                        {tickets}
                    </section>
                </div>
            </div>
        );
    }
}


export default App;

