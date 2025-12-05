let sesionActiva = false;

function actualizarMenu() {
    const elementosProtegidos = document.querySelectorAll('.menu-protegido');
    if (elementosProtegidos && elementosProtegidos.length > 0) {
        elementosProtegidos.forEach(elemento => {
            elemento.style.display = sesionActiva ? 'block' : 'none';
        });
    }
}

function alternarMenu() {
    const menuNav = document.getElementById('menuNav');
    if (menuNav) menuNav.classList.toggle('activo');
}

function verificarAcceso(nombrePagina) {
    if (!sesionActiva) {
        const ventana = document.getElementById('ventanaAcceso');
        if (ventana) ventana.classList.add('mostrar');
    } else {
        mostrarPagina(nombrePagina);
    }
}

function cerrarVentana() {
    const ventana = document.getElementById('ventanaAcceso');
    if (ventana) ventana.classList.remove('mostrar');
}

function mostrarPagina(nombrePagina) {
    const paginas = document.querySelectorAll('.pagina');
    paginas.forEach(pagina => pagina.classList.remove('activa'));

    const paginaSeleccionada = document.getElementById(nombrePagina);
    if (paginaSeleccionada) paginaSeleccionada.classList.add('activa');

    const menuNav = document.getElementById('menuNav');
    if (menuNav) menuNav.classList.remove('activo');

    window.scrollTo(0, 0);
}

function validarCampo(campo, validaciones) {
    if (!campo) return true;
    const valor = campo.value.trim();
    const mensajeError = document.getElementById(campo.id + '-error');
    const mensajeCorrecto = document.getElementById(campo.id + '-correcto');

    for (let validacion of validaciones) {
        if (!validacion.test(valor)) {
            campo.classList.remove('correcto');
            campo.classList.add('error');
            if (mensajeError) {
                mensajeError.textContent = validacion.mensaje;
                mensajeError.classList.add('mostrar');
            }
            if (mensajeCorrecto) mensajeCorrecto.classList.remove('mostrar');
            return false;
        }
    }

    campo.classList.remove('error');
    campo.classList.add('correcto');
    if (mensajeError) mensajeError.classList.remove('mostrar');
    if (mensajeCorrecto) mensajeCorrecto.classList.add('mostrar');
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const campoNombre = document.getElementById('nombre');
    if (campoNombre) {
        campoNombre.addEventListener('input', function() {
            validarCampo(this, [
                { test: (v) => v !== '', mensaje: 'El nombre es obligatorio' },
                { test: (v) => v.length >= 2, mensaje: 'Mínimo 2 caracteres' },
                { test: (v) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(v), mensaje: 'Solo letras' }
            ]);
        });
    }

    const campoApellido = document.getElementById('apellido');
    if (campoApellido) {
        campoApellido.addEventListener('input', function() {
            validarCampo(this, [
                { test: (v) => v !== '', mensaje: 'El apellido es obligatorio' },
                { test: (v) => v.length >= 2, mensaje: 'Mínimo 2 caracteres' },
                { test: (v) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(v), mensaje: 'Solo letras' }
            ]);
        });
    }

    const campoCorreo = document.getElementById('correo');
    if (campoCorreo) {
        campoCorreo.addEventListener('input', function() {
            validarCampo(this, [
                { test: (v) => v !== '', mensaje: 'El correo es obligatorio' },
                { test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), mensaje: 'Correo inválido' }
            ]);
        });
    }

    const campoTelefono = document.getElementById('telefono');
    if (campoTelefono) {
        campoTelefono.addEventListener('input', function() {
            validarCampo(this, [
                { test: (v) => v !== '', mensaje: 'El teléfono es obligatorio' },
                { test: (v) => /^\d{9}$/.test(v.replace(/\s/g, '')), mensaje: 'Debe tener 9 dígitos' }
            ]);
        });
    }

    const campoContrasena = document.getElementById('contrasena');
    if (campoContrasena) {
        campoContrasena.addEventListener('input', function() {
            validarCampo(this, [
                { test: (v) => v !== '', mensaje: 'La contraseña es obligatoria' },
                { test: (v) => v.length >= 8, mensaje: 'Mínimo 8 caracteres' },
                { test: (v) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v), mensaje: 'Incluye mayúsculas, minúsculas y números' }
            ]);
        });
    }

    const campoConfirmarContrasena = document.getElementById('confirmar-contrasena');
    if (campoConfirmarContrasena) {
        campoConfirmarContrasena.addEventListener('input', function() {
            const valorContrasena = campoContrasena ? campoContrasena.value : '';
            validarCampo(this, [
                { test: (v) => v !== '', mensaje: 'Confirma tu contraseña' },
                { test: (v) => v === valorContrasena, mensaje: 'Las contraseñas no coinciden' }
            ]);
        });
    }

    const formularioCuenta = document.getElementById('formularioCuenta');
    if (formularioCuenta) {
        formularioCuenta.addEventListener('submit', function(e) {
            e.preventDefault();

            const campos = [
                document.getElementById('nombre'),
                document.getElementById('apellido'),
                document.getElementById('correo'),
                document.getElementById('telefono'),
                document.getElementById('contrasena'),
                document.getElementById('confirmar-contrasena')
            ];

            let esValido = true;

            campos.forEach(campo => {
                if (campo) {
                    campo.dispatchEvent(new Event('input'));
                    if (campo.classList.contains('error') || !campo.value.trim()) {
                        esValido = false;
                        if (!campo.value.trim()) {
                            campo.classList.add('error');
                            const mensajeError = document.getElementById(campo.id + '-error');
                            if (mensajeError) {
                                mensajeError.textContent = 'Este campo es obligatorio';
                                mensajeError.classList.add('mostrar');
                            }
                        }
                    }
                }
            });

            const alerta = document.getElementById('alerta-cuenta');
            if (esValido) {
                alerta.className = 'alerta alerta-exito mostrar';
                alerta.textContent = '✓ ¡Cuenta creada exitosamente! Redirigiendo...';
                setTimeout(() => {
                    formularioCuenta.reset();
                    campos.forEach(campo => {
                        if (campo) {
                            campo.classList.remove('correcto', 'error');
                            const mensajeCorrecto = document.getElementById(campo.id + '-correcto');
                            const mensajeError = document.getElementById(campo.id + '-error');
                            if (mensajeCorrecto) mensajeCorrecto.classList.remove('mostrar');
                            if (mensajeError) mensajeError.classList.remove('mostrar');
                        }
                    });
                    sesionActiva = true;
                    actualizarMenu();
                    mostrarPagina('campanias');
                }, 1500);
            } else {
                alerta.className = 'alerta alerta-error mostrar';
                alerta.textContent = '✗ Por favor, completa todos los campos correctamente';
            }
        });
    }

    const formularioSesion = document.getElementById('formularioSesion');
    if (formularioSesion) {
        formularioSesion.addEventListener('submit', function(e) {
            e.preventDefault();

            const correo = document.getElementById('correo-sesion');
            const contrasena = document.getElementById('contrasena-sesion');
            const alerta = document.getElementById('alerta-sesion');
            let esValido = true;

            if (!correo.value.trim()) {
                correo.classList.add('error');
                document.getElementById('correo-sesion-error').textContent = 'El correo es obligatorio';
                document.getElementById('correo-sesion-error').classList.add('mostrar');
                esValido = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
                correo.classList.add('error');
                document.getElementById('correo-sesion-error').textContent = 'Correo inválido';
                document.getElementById('correo-sesion-error').classList.add('mostrar');
                esValido = false;
            }

            if (!contrasena.value) {
                contrasena.classList.add('error');
                document.getElementById('contrasena-sesion-error').textContent = 'La contraseña es obligatoria';
                document.getElementById('contrasena-sesion-error').classList.add('mostrar');
                esValido = false;
            }

            if (!esValido) {
                alerta.className = 'alerta alerta-error mostrar';
                alerta.textContent = '✗ Por favor, completa todos los campos correctamente';
                return;
            }

            alerta.className = 'alerta alerta-exito mostrar';
            alerta.textContent = '✓ Iniciando sesión...';
            setTimeout(() => {
                sesionActiva = true;
                actualizarMenu();
                mostrarPagina('campanias');
            }, 1200);
        });
    }

    const formularioReporte = document.getElementById('formularioReporte');
    if (formularioReporte) {
        formularioReporte.addEventListener('submit', function(e) {
            e.preventDefault();

            const distrito = document.getElementById('distrito');
            const direccion = document.getElementById('direccion');
            const descripcion = document.getElementById('descripcion');
            const correo = document.getElementById('correo-reporte');
            const alerta = document.getElementById('alerta-reporte');
            let esValido = true;

            if (!distrito.value) {
                distrito.classList.add('error');
                document.getElementById('distrito-error').textContent = 'Selecciona un distrito';
                document.getElementById('distrito-error').classList.add('mostrar');
                esValido = false;
            }

            if (!direccion.value.trim()) {
                direccion.classList.add('error');
                document.getElementById('direccion-error').textContent = 'La dirección es obligatoria';
                document.getElementById('direccion-error').classList.add('mostrar');
                esValido = false;
            }

            if (!descripcion.value.trim()) {
                descripcion.classList.add('error');
                document.getElementById('descripcion-error').textContent = 'La descripción es obligatoria';
                document.getElementById('descripcion-error').classList.add('mostrar');
                esValido = false;
            } else if (descripcion.value.trim().length < 20) {
                descripcion.classList.add('error');
                document.getElementById('descripcion-error').textContent = 'Mínimo 20 caracteres';
                document.getElementById('descripcion-error').classList.add('mostrar');
                esValido = false;
            }

            if (!correo.value.trim()) {
                correo.classList.add('error');
                document.getElementById('correo-reporte-error').textContent = 'El correo es obligatorio';
                document.getElementById('correo-reporte-error').classList.add('mostrar');
                esValido = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
                correo.classList.add('error');
                document.getElementById('correo-reporte-error').textContent = 'Correo inválido';
                document.getElementById('correo-reporte-error').classList.add('mostrar');
                esValido = false;
            }

            if (esValido) {
                alerta.className = 'alerta alerta-exito mostrar';
                alerta.textContent = '✓ ¡Reporte enviado exitosamente! Lo revisaremos pronto.';
                setTimeout(() => formularioReporte.reset(), 1200);
            } else {
                alerta.className = 'alerta alerta-error mostrar';
                alerta.textContent = '✗ Por favor, completa todos los campos correctamente';
            }
        });
    }

    const formularioContacto = document.getElementById('formularioContacto');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre-contacto');
            const correo = document.getElementById('correo-contacto');
            const telefono = document.getElementById('telefono-contacto');
            const asunto = document.getElementById('asunto');
            const mensaje = document.getElementById('mensaje');
            const alerta = document.getElementById('alerta-contacto');
            let esValido = true;

            if (!nombre.value.trim()) {
                nombre.classList.add('error');
                document.getElementById('nombre-contacto-error').textContent = 'El nombre es obligatorio';
                document.getElementById('nombre-contacto-error').classList.add('mostrar');
                esValido = false;
            } else if (nombre.value.trim().length < 3) {
                nombre.classList.add('error');
                document.getElementById('nombre-contacto-error').textContent = 'Mínimo 3 caracteres';
                document.getElementById('nombre-contacto-error').classList.add('mostrar');
                esValido = false;
            }

            if (!correo.value.trim()) {
                correo.classList.add('error');
                document.getElementById('correo-contacto-error').textContent = 'El correo es obligatorio';
                document.getElementById('correo-contacto-error').classList.add('mostrar');
                esValido = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
                correo.classList.add('error');
                document.getElementById('correo-contacto-error').textContent = 'Correo inválido';
                document.getElementById('correo-contacto-error').classList.add('mostrar');
                esValido = false;
            }

            if (!telefono.value.trim()) {
                telefono.classList.add('error');
                document.getElementById('telefono-contacto-error').textContent = 'El teléfono es obligatorio';
                document.getElementById('telefono-contacto-error').classList.add('mostrar');
                esValido = false;
            } else if (!/^\d{9}$/.test(telefono.value.replace(/\s/g, ''))) {
                telefono.classList.add('error');
                document.getElementById('telefono-contacto-error').textContent = 'Debe tener 9 dígitos';
                document.getElementById('telefono-contacto-error').classList.add('mostrar');
                esValido = false;
            }

            if (!asunto.value) {
                asunto.classList.add('error');
                document.getElementById('asunto-error').textContent = 'Selecciona un asunto';
                document.getElementById('asunto-error').classList.add('mostrar');
                esValido = false;
            }

            if (!mensaje.value.trim()) {
                mensaje.classList.add('error');
                document.getElementById('mensaje-error').textContent = 'El mensaje es obligatorio';
                document.getElementById('mensaje-error').classList.add('mostrar');
                esValido = false;
            } else if (mensaje.value.trim().length < 10) {
                mensaje.classList.add('error');
                document.getElementById('mensaje-error').textContent = 'Mínimo 10 caracteres';
                document.getElementById('mensaje-error').classList.add('mostrar');
                esValido = false;
            }

            if (esValido) {
                alerta.className = 'alerta alerta-exito mostrar';
                alerta.textContent = '✓ ¡Mensaje enviado! Te contactaremos pronto.';
                setTimeout(() => formularioContacto.reset(), 1200);
            } else {
                alerta.className = 'alerta alerta-error mostrar';
                alerta.textContent = '✗ Por favor, completa todos los campos correctamente';
            }
        });
    }

    document.querySelectorAll('input, textarea, select').forEach(campo => {
        campo.addEventListener('focus', function() {
            this.classList.remove('error');
            const idError = this.id + '-error';
            const mensajeError = document.getElementById(idError);
            if (mensajeError) mensajeError.classList.remove('mostrar');
        });
    });

    actualizarMenu();
});

/* -------------------------
Código Impacto
------------------------- */

function abrirMapaImpacto() {
    const modal = document.getElementById('modalMapaImpacto');
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function cerrarMapaImpacto() {
    const modal = document.getElementById('modalMapaImpacto');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.addEventListener('click', function (e) {
    const modal = document.getElementById('modalMapaImpacto');
    if (!modal || !modal.classList.contains('open')) return;
    const contenido = modal.querySelector('.modal-contenido');
    if (contenido && !contenido.contains(e.target)) {
        cerrarMapaImpacto();
    }
});

