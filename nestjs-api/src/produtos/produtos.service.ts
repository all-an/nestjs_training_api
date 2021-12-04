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
        const produto = this.encontraProduto(produtoId)[0];
        return { ...produto };
    }

    updateProduto(produtoId: string, nome: string, descricao: string, preco: number){
        const [produto, index] = this.encontraProduto(produtoId);
        const atualizaProduto = {...produto};
        if(nome){
            atualizaProduto.nome = nome;
        }
        if(descricao){
            atualizaProduto.descricao = descricao;
        }
        if(preco){
            atualizaProduto.preco = preco;
        }
        this.produtos[index] = atualizaProduto;
    }

    deleteProduto(prodId: string){
        const index = this.encontraProduto(prodId)[1];
        this.produtos.splice(index, 1);
    }

    private encontraProduto(id: string): [Produto, number]{
        const produtoIndex = this.produtos.findIndex(prod => prod.id === id);
        const produto = this.produtos[produtoIndex];
        if(!produto){
            throw new NotFoundException("Produto não encontrado");
        }
        return [produto, produtoIndex];
    }

}


