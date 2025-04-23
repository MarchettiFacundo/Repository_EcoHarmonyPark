# TP4 - SMC

## INGENIERÍA Y CALIDAD DE SOFTWARE - TRABAJO PRÁCTICO N° 4 - 2025

### UNIVERSIDAD TECNOLÓGICA NACIONAL  
**FACULTAD REGIONAL CÓRDOBA**

---

## INGENIERÍA Y CALIDAD DE SOFTWARE  
### TRABAJO PRÁCTICO N° 4  

### "SCM - HERRAMIENTAS DE SCM"

**Profesores:**  
- Laura Covaro  
- Mickaela Crespo  
- Constanza Garnero  

**Grupo N° 8**  

**Integrantes:**  
- Allende, Alex Maximiliano - 97790  
- Alloati, Ludmila - 98464  
- Carrazco Corzo, Mirco - 95665  
- Dominguez, Tomas - 92602  
- Guevara, Daniel - 57743  
- Marchetti, Facundo - 89968  
- Olivieri, Agustín - 95441  
- Osimani, Gonzalo - 82362  
- Wunderlin, David - 84751  

**Fecha de entrega:** 01/04/2025  

---

## DOCUMENTO DE CONFIGURACIÓN  

### Estructura del repositorio:  
```
└───Proyecto_EcoHarmonyPark
    ├───Lineas Base
    ├───Producto
    │   ├───Arquitectura del producto
    │   ├───Casos de prueba
    │   └───Codigo Fuente
    └───Proyecto
        ├───Métricas del Proyecto
        ├───Product Backlog
        │   └───User Stories
        └───Sprint
            └───Sprint 1
                ├───Codigo Fuente
                ├───Metricas del sprint
                ├───Revisiones
                └───Sprint Backlog
```

### Identificación de ítems de configuración:  

| **Listado de ítems** | **Regla de nombrado** | **Ubicación física** | **Tipo de ítem** |
|----------------------|----------------------|----------------------|------------------|
| Código fuente | `<Archivo_Codigo>.<extension>` | `http://<IP servidor>/EHP/Producto/Código Fuente` | Producto |
| Código fuente sprint | `EHP_<Archivo_codigo>-<extension>` | `http://<IP servidor>/EHP/Producto/Sprint_n/Código Fuente` | Iteración |
| Product Backlog | `EHP_Product_Backlog.png` | `http://<IP servidor>/EHP/Proyecto/Product Backlog` | Producto |
| Sprint Backlog | `EHP_<Sprint_n>Backlog.png` | `http://<IP servidor>/EHP/Proyecto/Sprints/Sprint_n/Sprint Backlog` | Iteración |
| Arquitectura | `EHP_Arquitectura_.docx` | `http://<IP servidor>/EHP/Producto/Arquitectura` | Producto |
| User Story | `EHP_UserStory_<US_nombre>_<NumeroUS>.docx` | `http://<IP servidor>/EHP/Proyecto/Product Backlog/User Stories` | Producto |
| Métricas del proyecto | `EHP_Metrica_NombreMetrica.docx` | `http://<IP servidor>/EHP/Producto/Métricas del proyecto` | Proyecto |
| Línea Base del proyecto | `EHP_LineaBase_<NumLineaB>_.docx` | `http://<IP servidor>/EHP/Lineas Base` | Iteración |
| Casos de Prueba | `EHP_CasosDePrueba.xlsx` | `http://<IP servidor>/EHP/Producto/Casos de prueba` | Producto |

**Reglas de versionado:**

Las versiones deben seguir el formato `vX.Y.Z`, donde:
- **X** es una versión mayor.
- **Y** es una versión menor.
- **Z** representa cambios o correcciones.

Los nombres de sprints seguirán el formato `Sprint_n`, representando el número del sprint.

---

## Glosario  

| **SIGLA** | **SIGNIFICADO** |
|----------|---------------|
| `<IP servidor>` | Número de IP del servidor que aloja el repositorio del proyecto EcoHarmony Park. Ej: 192.168.151.3 |
| `<Sprint_n>` | Número de sprint. Ej: Sprint_7 |
| `<US_nombre>` | Nombre de la User Story |
| `<NumeroUS>` | Número de identificación de la User Story |
| `<NumLineaB>` | Número de identificación de la Línea Base |

---

## Criterio para la creación de la línea base:  

Se establecerá una nueva línea base cuando, luego de que se hayan ejecutado y superado todas las pruebas unitarias, de integración y funcionales, el Product Owner valide y apruebe el incremento del producto/proyecto, estableciendo el mismo como estable.

Esto puede ocurrir:
- Luego de la finalización de cada sprint.
- Cuando se alcancen hitos importantes en el desarrollo.
