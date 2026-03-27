# Flows Graph - Dra. Noelia Sandoval

## User Journey
```mermaid
graph TD
    A[Inicio/Hero] --> B[Tecnología Láser]
    A --> C[Inyectables/Cirugía]
    B --> D[Carrusel Interno Card]
    D --> E[Consulta WhatsApp]
    C --> E
    E --> F[Cierre/Agendamiento]
```

## Data Lifecycle
- **Assets:** Procesados (Crop 25%) -> Assets/Images -> index.html (Src + ?v=5)
- **Navigation:** Menu Desktop/Mobile -> Section Anchors (#card-id)
