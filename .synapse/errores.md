| ID | Error / Bug | Síntoma | Root Cause | Solución | Estado |
|:---|:---|:---|:---|:---|:---|
| ERR-01 | **Corte superior en Ozonoterapia** | Texto "OZONOTERAPIA" se corta en mobile | `object-position: -40px` | Cambiado a `object-position: top center` | ✅ FIXED |
| ERR-02 | **Jerarquía móvil fallida** | Imagen aparecía arriba del texto en mobile a pesar del cambio en el DOM | Falta de control de `flex-direction` en el contenedor padre | Forzado `flex-direction: column` en `.treatment-card` | ✅ FIXED |
| ERR-03 | **"Grisura" en Desktop** | Colores se ven apagados comparados con mobile | Overlays oscuros y falta de filtros de saturación de serie en navegadores de escritorio | Eliminado overlay excesivo y añadido `filter: saturate(1.15)` | ✅ FIXED |
