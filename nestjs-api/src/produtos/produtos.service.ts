import { Injectable, NotFoundException } from "@nestjs/common";
import { Produto } from "./produto.model";

@Injectable()
export class ProdutosService{
    produtos: Produto[] = [];

    inserirProduto(nome: string, desc: string, preco: number){
        const crypto = require("crypto");

        const prodId = crypto.randomBytes(16).toString("hex");

        const novoProduto = new Produto(prodId, nome, desc, preco);
        this.produtos.push(novoProduto);
        return prodId;
    }

    getProdutos(){
        return [...this.produtos];
    }

    getUmProduto(produtoId: string){
        const produto = this.produtos.find(prod => prod.id === produtoId);
        if(!produto){
            throw new NotFoundException("Produto não encontrado");
        }
        return { ...produto };
    }
}


