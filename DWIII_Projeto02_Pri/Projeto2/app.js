import fs from 'fs/promises';
import chalk from 'chalk';

// Expressão Regular 
const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/g;

// Função para extrair links
function extraiLinks(texto) {
    const resultados = [...texto.matchAll(regex)];

    return resultados.map(resultado => ({
        nome: resultado[1],
        url: resultado[2]
    }));
}

// Função principal (leitura do arquivo)
async function pegaArquivo(caminhoArquivo) {
    try {
        const texto = await fs.readFile(caminhoArquivo, 'utf-8');

        const links = extraiLinks(texto);

        // Saída formatada
        links.forEach(link => {
            console.log(`Referência: ${link.nome} | Link: ${link.url}`);
        });

    } catch (erro) {
        // Tratamento de erro com fundo vermelho
        console.log(
            chalk.bgRed.white('Erro: Arquivo não encontrado ou inválido!')
        );
    }
}

// Executar
pegaArquivo('./Projeto2_arquivo.md');