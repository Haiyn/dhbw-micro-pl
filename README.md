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

e) Imagenamen können in `manifests/kustomization.yaml` angesehen und bearbeitet werden.
f) Lastenverteilung wird durch die Verwendung einer Ingress-Route auf den externen Schnittstellen (Receivedata - POST, 
GET und Displaydata - GET) ermöglicht. Aus Ressourcengründen läuft nur eine Instanz des Receivedata-Services. Das kann
durch den Integer bei `replicas` in `dhbw-receivedata/manifests/deploy/k82/deployment.yaml` angepasst werden.
g) Der Hostname kann in den Ingress-Dateien (`manifests/deploy/k8s/ingress.yaml`) für Receivedata und Displaydata 
angepasst werden.
h) Anpassungen an den Verbindungsparametern können in `dhbw-displaydata/manifests/deploy/k8s/deployment.yaml`
vorgenommen werden. Sie müssen mit den Startparametern der MongoDB in `dhbw-mongodb/manifests/deploy/k8s/deployment.yaml`
übereinstimmen.
i) Der Receivedata-Service wird mit einer HTTP-LivenessProbe gegen `/values` (GET) abgefragt. Schlägt diese fehl, wird der 
Pod neugestartet.
j) Siehe `dhbw-receivedata/manifests/k8s/deployment.yaml`
