# Errores

_No hay errores registrados todavÃ­a._

## ERR-03: Logo con fondo negro persistente (2026-03-08)
**Síntoma:** El logo `logo-ns.png` seguía viéndose con el cuadrado negro de fondo.
**Root Cause:** El script anterior que usamos para la transparencia solo usó un threshold estricto absoluto y puede haber pisado la raíz pero no `assets/images`.
**Solución:** Se aplicó un script en Python con Pillow calculando la luminancia máxima para mantener el "Anti-Aliasing" dorado suave pero hacer 100% transparente el fondo negro en el archivo puntual `assets/images/logo-ns.png`
**Estado:**  FIXED

