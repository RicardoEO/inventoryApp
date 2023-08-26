import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  selectedEmployed: any = null;
  marcas: any[] = [
    {
      id: 0,
      nombre: 'Seleccione una opción...'
    },
    {
      id: 1,
      nombre: 'HP'
    },
    {
      id: 2,
      nombre: 'DELL'
    },
    {
      id: 3,
      nombre: 'LENOVO'
    }
  ]

  modelos: any[] = [
    {
      id: 0,
      nombre: 'Seleccione una opción...'
    },
    {
      id: 1,
      nombre: 'ALTITUDE 5500'
    },
    {
      id: 2,
      nombre: 'ALTITUDE 5400'
    },
    {
      id: 3,
      nombre: 'ALTITUDE 5300'
    }
  ]

  inputs: any = {
    serie: '',
    marca: {
      id: 0,
      nombre: 'Seleccione una opción...'
    },
    modelo: {
      id: 0,
      nombre: 'Seleccione una opción...'
    },
    fechaAsignacion: '',
    gerencia: '',
    localidad: 0,
    empleado: '',
    anioCompra: 0,
    jefatura: ''
  }
  activos: any[] = [];
  activosDummy: any[] = [
    {
      serie: '123',
      marca: {
        id: 1,
        nombre: 'HP'
      },
      modelo: {
        id: 2,
        nombre: 'ALTITUDE 5400'
      },
      fechaAsignacion: '05-08-2023',
      gerencia: 'General',
      localidad: 0,
      empleado: 'Sebastian',
      anioCompra: 2023,
      jefatura: 'Ricardo'
    }
  ]

  ngOnInit() {
    const item = localStorage.getItem('activos');
    this.activos = item ? JSON.parse(item) : [];
  }

  ngAfterViewInit() {
    this.inputs.marca = this.marcas[0];
    this.inputs.modelo = this.modelos[0];
  }

  existeActivo(): boolean {
    return this.activos.some((activo: any) => this.inputs.serie === activo.serie)
  }

  action() {
    if(this.validarFormulario()) {
      if(this.selectedEmployed) {
        // se debe modificar el activo
        const activos = this.activos.map((activo: any) => {
          if(activo.serie === this.selectedEmployed.serie) {
            // confirmar si esta seguro de modificar el registro
            if(confirm("¿Está seguro de modificar el registro?")) {
              activo = {...this.inputs};
            }
          }
          return activo;
        })
        this.activos = activos;
        console.log(activos)
        this.selectedEmployed = null;
        localStorage.setItem('activos', JSON.stringify(this.activos));
        this.resetFormulario()
        return;
      } else {
        if(this.existeActivo()) {
          alert("Esta serie ya existe")
        return;
        }
        // se debe agregar el activo
        this.activos.push(this.inputs)
        this.resetFormulario()
        localStorage.setItem('activos', JSON.stringify(this.activos));
      }
    }
    // if(this.validarFormulario()) {
    //   if(this.existeActivo()) {
    //     // se debe modificar el activo
    //     const activos = this.activos.map((activo: any) => {
    //       if(activo.serie === this.inputs.serie) {
    //         // confirmar si esta seguro de modificar el registro
    //         if(confirm("Esta serie ya existe, ¿Está seguro de modificar el registro?")) {
    //           activo = {...this.inputs};
    //         }
    //       }
    //       return activo;
    //     })
    //     this.activos = activos;
    //     console.log(activos)
    //   } else {
    //     // se debe agregar el activo
    //     this.activos.push(this.inputs)
    //     this.resetFormulario()
    //   }
    //   localStorage.setItem('activos', JSON.stringify(this.activos));
    // }
    console.log(this.inputs)
  }

  resetFormulario() {
    this.inputs = {
      serie: '',
      marca: {
        id: 0,
        nombre: 'Seleccione una opción...'
      },
      modelo: {
        id: 0,
        nombre: 'Seleccione una opción...'
      },
      fechaAsignacion: '',
      gerencia: '',
      localidad: 0,
      empleado: '',
      anioCompra: '',
      jefatura: ''
    }
    this.inputs.marca = this.marcas[0];
    this.inputs.modelo = this.modelos[0];
  }

  editar(activo: any): void {
    this.selectedEmployed = activo;
    this.inputs = {...activo};
    this.inputs.marca = this.marcas.find(marca => marca.id === activo.marca.id);
    this.inputs.modelo = this.modelos.find(modelo => modelo.id === activo.modelo.id);
  }
  
  validarFormulario(): boolean {
    console.log(this.inputs)
    let valido: boolean = true;
    Object.keys(this.inputs).forEach((key: any) => {
      const value = this.inputs[key];
      if (value === '' || value === 0) {
        valido = false;
        alert("Falta llenar el campo " + key)
        return;
      }
    })
    return valido;
  }

  
  eliminar(fila: any) {
    if(confirm("¿Está seguro de eliminar el registro?")) {
      this.activos = this.activos.filter((activo: any) => activo.serie !== fila.serie)
      localStorage.setItem('activos', JSON.stringify(this.activos));
    }
  }

}