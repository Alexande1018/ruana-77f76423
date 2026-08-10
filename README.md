# RUANA Connect

---

**PROMPT PARA LOVABLE**

Quiero que construyas una **aplicación web llamada RUANA v1 (Red Unificada de Alianza de Negocios Aliados)**.

⚠️ **Regla crítica**:
No inventes reglas, no optimices, no “mejores” nada.
Implementa **exactamente** lo descrito. Si algo no está definido, **no lo hagas**.

---

## OBJETIVO

Crear una **app web funcional y demostrable** para una red privada de profesionales locales con:

* exclusividad por oficio y zona
* sistema de puntos
* solicitudes semanales
* recomendaciones
* panel de administración

No es producto final, es **RUANA v1 vendible**.

---

## ROLES

1. **Profesional**
2. **Administrador**

---

## ENTIDADES PRINCIPALES

* Profesional
* Zona
* Oficio
* Solicitud semanal
* Recomendación

---

## ESTADOS DE PROFESIONAL

* Pendiente
* Titular
* Suplente
* Suspendido
* Rechazado

---

## REGLAS CLAVE (OBLIGATORIAS)

### Exclusividad

* Por cada **zona + oficio**:

  * 1 Titular máximo
  * 1 Suplente máximo
* El resto quedan Pendientes hasta decisión del Admin.

### Puntos

* Titular aprobado empieza con **100 puntos**
* Suplente aprobado empieza con **50 puntos**
* Acciones:

  * Recibir recomendación: **+10**
  * Dar recomendación: **+5** (máx 1 por miembro al mes)
  * Responder solicitud: **+3**
* Si Titular < 50 puntos → mostrar badge **“En Revisión”**
* Si hay suplente y titular < 50 → suplente muestra badge **“Oportunidad Disponible”**

### Solicitudes semanales

* Cada profesional puede tener **1 solicitud activa por semana**
* Texto libre corto: “Busco [oficio] para [necesidad]”
* Visible solo dentro de su zona
* Al publicar una nueva, la anterior se archiva
* Responder muestra el contacto del solicitante
* No hay chat interno

### Recomendaciones

* Solo entre profesionales de la misma zona
* No se puede recomendar a uno mismo
* Máx 1 recomendación por par de profesionales cada 30 días
* La recomendación es texto corto + fecha
* Aparece en el perfil del recomendado

---

## PANTALLAS OBLIGATORIAS

### Públicas

1. **Landing**

   * Explicación corta de RUANA
   * Botón “Solicitar acceso”
2. **Formulario de registro**

   * Nombre
   * Email
   * Teléfono
   * Oficio (selector)
   * Zona (selector)
   * Descripción breve
   * Foto

### Autenticación

3. Login (email + contraseña)

### Profesional

4. **Dashboard**

   * Mis puntos
   * Mi estado (Titular / Suplente / En revisión)
   * Solicitudes activas de mi zona
   * Botón “Publicar mi solicitud semanal”
5. **Mi perfil**

   * Datos básicos
   * Puntos
   * Recomendaciones recibidas
6. **Directorio**

   * Profesionales de mi zona
   * Mostrar titulares y suplentes (badge)
   * Búsqueda por oficio
7. **Perfil de otro profesional**

   * Nombre
   * Oficio
   * Zona
   * Puntos
   * Recomendaciones
   * Botón “Recomendar”

### Administrador

8. **Panel Admin**

   * Lista de registros Pendientes
   * Aprobar como Titular / Suplente / Rechazar
   * Lista de todos los miembros
   * Cambiar estado (Titular ↔ Suplente)
   * Suspender / Reactivar
   * Ajustar puntos manualmente
   * Ver titulares < 50 puntos

---

## RESTRICCIONES IMPORTANTES

* ❌ No mensajería interna
* ❌ No pagos
* ❌ No notificaciones push
* ❌ No multi-zona por usuario
* ❌ No multi-oficio por usuario
* ❌ No analytics avanzados
* ❌ No app móvil nativa

---

## DISEÑO

* Web responsive
* Estilo limpio, profesional
* Priorizar claridad sobre estética
* Badges claros para estados:

  * Titular
  * Suplente
  * En Revisión
  * Oportunidad Disponible

---

## RESULTADO ESPERADO

* App web funcional
* Login real
* Flujos completos:

  * registro → aprobación → uso semanal → recomendaciones
* Lista para:

  * demo
  * validación
  * primeros usuarios reales

No expliques lo que haces.
Solo construye la app según lo descrito.

---

Cuando lo tengas, dime:

* qué partes quedaron limitadas
* qué reglas no pudiste implementar exactamente

---

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ruana.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3ebd19c9-6981-45ad-aab9-0f9d5f3586bc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
