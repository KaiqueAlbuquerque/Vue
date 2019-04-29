<template>
  <div>
    <h1 class="centralizado">{{titulo}}</h1>

    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="filtre pelo título ">
    {{ filtro }}
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform:scale.animate="1.1" :url="foto.url" :titulo="foto.titulo" />
          <router-link :to="{ name: 'altera', params: { id: foto._id } }">
            <meu-botao tipo="button" rotulo="ALTERAR" />
          </router-link>
          <meu-botao tipo="button" rotulo="REMOVER" :confirmacao="false" estilo="perigo" @botaoAtivado="remove(foto)" />
        </meu-painel>  
      </li>
    </ul>   
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/botao.vue';
import FotoService from '../../domain/foto/FotoService';

import transform from '../../directives/Transform';

export default {
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },

    directives: {
      'meu-transform': transform
    },

  data(){
    return{
      titulo: "Alurapic",
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },

  computed: {
    fotosComFiltro(){
      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      }
      else{
        return this.fotos;
      }
    }
  },

  methods:{
    remove(foto){
      this.service = new FotoService(this.$http);

      let promisse = this.service.apaga(foto._id);

      promisse
        .then(() => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice,1);
          this.mensagem = 'Foto removida com sucesso'
        }, err => this.mensagem = err.message);
    }
  },

  created(){
    this.service = new FotoService(this.$http);

    let promisse = this.service.lista();

    promisse
      .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);
  }
}
</script>

<style>
  .centralizado{
    text-align: center;
  }

  .lista-fotos{
    list-style: none;
  }

  .lista-fotos .lista-fotos-item{
    display: inline-block;
  }

  .filtro {
    display: block;
    width: 100%;
  }
</style>
