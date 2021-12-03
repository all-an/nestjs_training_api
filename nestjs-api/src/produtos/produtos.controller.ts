import { Body, Controller, Post } from "@nestjs/common";
import { ProdutosService } from "./produtos.service";

@Controller('produtos')
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService ) {}

    @Post()
    adicionaProduto(
        @Body('nome') produtoNome: string,
        @Body('descricao') produtoDescricao: string,
        @Body('preco') produtoPreco: number,
        ) {
        const idGerada = this.produtosService.inserirProduto(
            produtoNome,
            produtoDescricao,
            produtoPreco
        );
        return { id: idGerada}
    }
}