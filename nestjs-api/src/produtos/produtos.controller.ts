import { Body, Controller, Get, Header, Param, Post, Patch, Delete } from "@nestjs/common";
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

    @Get()
    getTodosProdutos() {
        return this.produtosService.getProdutos();
    }

    @Get(':id')
    @Header('Content-Type', 'application/json')
    getProduto(@Param('id') prodId: string){
        return this.produtosService.getUmProduto(prodId); 
    }

    @Patch(':id')
    updateProcuto(
        @Param('id') prodId: string, 
        @Body('nome') prodNome: string, 
        @Body('descricao') prodDesc: string,
        @Body('preco') prodPreco: number
        ){
        this.produtosService.updateProduto(prodId,prodNome,prodDesc,prodPreco);
        return null;
    }

    @Delete(':id')
    removeProduto(@Param('id') prodId: string){
        this.produtosService.deleteProduto(prodId);
        return null;
    }

}