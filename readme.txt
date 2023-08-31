#para compilar la imagen
    docker build -t cron_img .

#ejecutar la imagen en modo interactivo

 docker run -it  -d cron_img -n cron_container