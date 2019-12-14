import React, { Component } from 'react';

class Form extends Component {
    constructor() {
        super();

        this.state = {
            title: 'Tercera edad',
            nTicket: 0
        }

        //Declaramos la funcion para que no pierda el valor
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //Captura un cambio en el formulario 
    handleInputChange(e){
        const {value} = e.target; // Captura el valor seleccionado
        this.setState({
            title : value // Asigna el valor seleccionado a title
        })
    }

    // Función para el envío de datos
    handleSubmit(e){
        const {title, nTicket} = this.state; //Extraemos los valores del estado.
        e.preventDefault(); //Evita refrescar la pantalla

        // Objeto que contiene el título y el número de ticket
        const newTicket = {
            title,
            nTicket: nTicket + 1
        }

        this.setState(newTicket); //Cambiamos el estado de newTicket
        this.props.onAddTicket(newTicket);
    }

    render() {
        return (
            <div className="card mt-4">
                <form className="card-body" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <select 
                            name="title"
                            className="form-control" 
                            value={this.state.title} //Captura el valor seleccionado
                            onChange={this.handleInputChange} //Captura un cambio en el formulario
                        >
                            {/* Muestra las opciones del formulario */}
                            <option>Tercera edad</option>
                            <option>Cliente normal</option>
                            <option>Empresarial</option>
                            <option>Servicio al cliente</option>

                        </select>
                    </div>
                    {/* Crea un nuevo ticket con la opcion seleccionada y un número de ticket */}
                    <button type="submit" className="btn btn-success" >
                        Crear
                    </button>
                </form>
            </div>
        );
    }
}

export default Form;