Descripcion y diagrama de la arquitectura https://docs.google.com/presentation/d/1lr_WTDt1CDrUyxUARTy-I7GzvyY1AQ9AN7HtnnqWx_g/edit?usp=sharing

¿Que se hizo?

- Una App que permite realizar un ABM de usuarios.

¿Como se hizo?

- Utilizando nodejs, nestjs, MongoDB, Docker, Kubernetes (minikube), Traefik, helm, Ansible.  

¿Porque lo hice?

- Porque quize plasmar mis habilidades en Docker y Kubernetes, igualmente mis habilidades de desarrollo, utilizando un lenguaje muy utilizado hoy en dia como lo son NodeJS, y una base de datos como MongoDB.

Como correr la app en entorno local

- Tener instalado Minikube, Docker, Git, Helm, Ansible

- 1er   Levantar minikube con el comando "minikube start --vm-driver=virtualbox"
  2do   Ingresar al directorio ansible-role-traefik-kubernetes/tasks del repositorio y ejecutar "ansible-playbook install.yml --extra-vars "{\"NOMBRE\":\"testrappi\"}" "
  3ero  Ejecutar "eval $(minikube docker-env)" para que la imagen se compile dentro del la VM de minikube
  4to   Ejecutar en el directorio raiz del proyecto "docker build -t test:testrappi  ."
  5to   Realizar el despliegue de la app (Deployments, Services, Ingress) en Kubernetes con los siguientes comandos en el directorio raiz del proyecto:
         - kubectl apply -f deployment.yml
         - kubectl apply -f service.yml
         - kubectl apply -f ingress.yml
  6to   Desplegar MongoDB con helm "helm install my-release \
        --set auth.rootPassword=root,auth.username=prueba,auth.password=prueba,auth.database=rappitest \
        bitnami/mongodb"

- Para conocer la IP de minikube ejecutar el siguiente comando "minikube ip"

- Los endpoint de la app son:
  Agregar Usuario: "http://${minikube ip}:31150/rappi/agregarUsuario" metodo Post con el siguiente json 
     
     {
        "dni": "18116523-5",
        "nombre": "Juan",
        "apellido": "Acuna",
        "direccion": "Raymond Monvoisin 913",
        "telefono": "+56962394415",
        "edad": "30",
        "fechaContratacion": "20/09/2022",
        "fechaSalida": "20/09/2030"
     }

  Buscar Usuario: "http://${minikube ip}:31150/rappi/obtenerUsuario?dni=${dni}" metodo get ejemplo: 
    
    http://${minikube ip}:31150/rappi/obtenerUsuario?dni=18116523-5
  
  Modificar Usuario: "http://${minikube ip}:31150/rappi/modificarUsuario" metodo Post con el siguiente json con los datos modificados:

      {
        "dni": "18116523-5",
        "nombre": "Pedro",
        "apellido": "Acuna",
        "direccion": "Raymond Monvoisin 913",
        "telefono": "+56962394415",
        "edad": "30",
        "fechaContratacion": "20/09/2022",
        "fechaSalida": "20/09/2030"
      }

  Eliminar Usuario: "http://${minikube ip}:31150/rappi/borrarUsuario??dni=${dni}" metodo get ejemplo: 

      "http://${minikube ip}:31150/rappi/borrarUsuario??dni=18116523-5"
