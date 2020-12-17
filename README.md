# Anmerkungen

Bearbeiter: Luca Massa (9989610)

Hier ein paar Anmerkungen zu meiner Lösung.

## NodeJS Programmierung

a) Änderungen wurden in `dhbw-displaydata/index.js` vorgenommen. Ergänzungen:
* Verwendung des npm package `mongoose`
* Methode zum dynamischen bauen des DB connection strings basierend auf Environment-Variablen in `docker/.env`
* Mappingmethode, Schema und Model für mongoose
* Speichermethode für das eigentliche Speichern (zeigt den gespeicherten Eintrag direkt an)

b) + c) Lokal können die services mithilfe von docker-compose im ordner `docker` gestartet werden. Diese compose file 
benutzt die `.env` Environment file im selben Ordner. Dort können die Endpunkte für die Services angepasst werden 
(Host und Port). Auch beinhaltet sie die Default-Werte für die MongoDB. Sollen andere Werte verwendet werden, können 
diese in der Shell hinzugefügt werden. 
Syntax: `docker-compose up -e [ENV_VAR]=[ENV_VAL]`
Um also zum Beispiel den MongoDB Username auf "Admin" zu setzen, kann entweder die `.env`-Datei angepasst werden oder
`docker-compose up -e MONGO_USER=Admin` ausgeführt werden.

## Kubernetes Deployment

Orchestration wurde mit minikube realisiert (minikube v1.13.0 on Arch 20.1.2).
Jeder Service kann jeweils im entsprechenden `manifests`-Ordner mit kustomize gestartet werden:

```
kubectl apply -k [path_to_manifests_folder]
```

e) Imagenamen können in `docker/docker-compose.yml` angesehen und bearbeitet werden.