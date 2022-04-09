//images resize
const sharp = require('sharp')
const compress_images = require('compress-images');
const fs = require('fs');

let path = process.argv[2]; //ignora o elemento 0(node) e o 1(nome do arquivo) 
let width = Number(process.argv[3]) ;

function resize(inputPath, outputPath, width){

    sharp(inputPath)
              .resize({ width: width})  // altera o width e height, no caso apenas o width com o valor passado como [3] nos argumentos.              
              .toFile(outputPath, (err) => {

                    if(err){
                      console.log(err)
                    }else{
                      console.log('Imagens redimensionada com sucesso!')
                      compress(outputPath, "./compressed/");// ao finalizar o resize ele ja executa o compress
                    }
                  })

}

function compress(pathInput, outputPath){

          compress_images(pathInput, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
            { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
            { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
            { svg: { engine: "svgo", command: "--multipass" } },
            { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
        console.log("-------------");
        console.log(error);
        console.log(completed);
        console.log(statistic);
        console.log("-------------");

        fs.unlink(pathInput, (err) => { // ao final de compress, apaga a img temporaria.
          if(err){
            console.log(err)
          }else {
            console.log(pathInput, " Apagado")
          }
        })
});

}

resize(path,'./temp/output_resize.jpg', width);