// LEGENDA DAS IMAGENS
/*
emerson
emerson rocha
emerson livro
emerson bota
emerson cerveja
emerson brocha
emerson paçoca
emerson nota
emerson jota
emerson porca
*/

import {
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';

const mapaDeImagens = {
  'emerson': require('./assets/emerson.jpg'),
  'emerson rocha': require('./assets/emersonrocha.png'),
  'emerson livro': require('./assets/emersonlivro.png'),
  'emerson bota': require('./assets/emersonbota.png'),
  'emerson cerveja': require('./assets/emersoncerveja.png'),
  'emerson brocha': require('./assets/emersonbrocha.png'),
  'emerson paçoca': require('./assets/emersonpacoca.png'),
  'emerson pacoca': require('./assets/emersonpacoca.png'),
  'emerson nota': require('./assets/emersonnota.png'),
  'emerson jota': require('./assets/emersonjota.png'),
  'emerson porca': require('./assets/emersonporca.png'),
};
const imagemPadraoErro = require('./assets/nophoto.jpg');
const imagemNaoEncontrada = require('./assets/nophoto.jpg');

const InputNeumorfico = (propriedades) => {
  return (
    <View style={[estilos.containerNeumorfico, { borderRadius: 15 }, propriedades.estaFocado && estilos.pressionado]}>
      <View style={propriedades.estaFocado ? estilos.sombraInferiorPressionado : estilos.sombraInferior} />
      <View style={propriedades.estaFocado ? estilos.sombraSuperiorPressionado : estilos.sombraSuperior} />
      <TextInput {...propriedades} style={estilos.campoDeTexto} />
    </View>
  );
};

const BotaoNeumorfico = ({ onPress, titulo }) => {
  const [estaPressionado, setEstaPressionado] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setEstaPressionado(true)}
      onPressOut={() => setEstaPressionado(false)}
      style={[estilos.containerNeumorfico, estilos.botao, estilos.botaoVerde, estaPressionado && estilos.pressionado]}
    >
      <View style={estaPressionado ? estilos.sombraSuperiorPressionadoVerde : estilos.sombraInferiorVerde} />
      <View style={estaPressionado ? estilos.sombraInferiorPressionadoVerde : estilos.sombraSuperiorVerde} />
      <Text style={estilos.textoDoBotao}>{titulo}</Text>
    </Pressable>
  );
};

const CardNeumorfico = ({ children }) => {
  return (
    <View style={[estilos.containerNeumorfico, estilos.card]}>
      <View style={[estilos.sombraInferior, { borderRadius: 25 }]} />
      <View style={[estilos.sombraSuperior, { borderRadius: 25 }]} />
      {children}
    </View>
  );
};

export default function Aplicativo() {
  const [imagem, setImagem] = useState(null);
  const [valorInput, setValorInput] = useState('');
  const [mensagemErro, setMensagemErro] = useState(null);
  const [estaFocado, setEstaFocado] = useState(false);

  function exibirImagem() {
    const termoDeBusca = valorInput.toLowerCase().trim();
    const imagemEncontrada = mapaDeImagens[termoDeBusca];

    if (imagemEncontrada) {
      setImagem(imagemEncontrada);
      setMensagemErro(null);
    } else if (termoDeBusca === '') {
      setImagem(imagemPadraoErro);
      setMensagemErro(null);
    } else {
      setImagem(imagemNaoEncontrada);
      setMensagemErro('001. Erro. Imagem não encontrada.');
    }
  }

  return (
    <View style={estilos.telaPrincipal}>
      <SafeAreaView style={estilos.areaDeConteudo}>
        <Text style={estilos.titulo}>Emerson Fotos</Text>

        <InputNeumorfico
          placeholder="Digite o nome da foto"
          placeholderTextColor="#888"
          onChangeText={setValorInput}
          value={valorInput}
          onFocus={() => setEstaFocado(true)}
          onBlur={() => setEstaFocado(false)}
          estaFocado={estaFocado}
        />

        {mensagemErro && <Text style={estilos.textoDeErro}>{mensagemErro}</Text>}

        {imagem && (
          <CardNeumorfico>
            <Image source={imagem} style={estilos.estiloDaImagem} />
          </CardNeumorfico>
        )}

        <BotaoNeumorfico titulo="Exibir Imagem" onPress={exibirImagem} />

      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  telaPrincipal: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaDeConteudo: {
    width: '90%',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6d6d6d',
    marginBottom: 30,
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1
  },
  textoDeErro: {
    color: '#a84a4a',
    fontWeight: '500',
    marginTop: 10,
    minHeight: 20,
  },
  containerNeumorfico: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  campoDeTexto: {
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontSize: 16,
    color: '#333',
    zIndex: 1,
    outlineStyle: 'none',
  },
  botao: {
    width: 200,
    height: 50,
    borderRadius: 15,
    marginTop: 20,
  },
  card: {
    width: 250,
    height: 250,
    borderRadius: 25,
    marginVertical: 20,
  },
  estiloDaImagem: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    zIndex: 1,
  },
  sombraSuperior: {
    position: 'absolute', width: '100%', height: '100%', borderRadius: 15,
    shadowColor: "#ffffff", shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1, shadowRadius: 6,
  },
  sombraInferior: {
    position: 'absolute', width: '100%', height: '100%', borderRadius: 15,
    shadowColor: "#bebebe", shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1, shadowRadius: 6,
  },
  pressionado: {},
  sombraSuperiorPressionado: {
    position: 'absolute', width: '100%', height: '100%', borderRadius: 15,
    shadowColor: "#bebebe", shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1, shadowRadius: 5,
  },
  sombraInferiorPressionado: {
    position: 'absolute', width: '100%', height: '100%', borderRadius: 15,
    shadowColor: "#ffffff", shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1, shadowRadius: 5,
  },
  botaoVerde: {
    backgroundColor: '#35bb37',
  },
  textoDoBotao: {
    zIndex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  sombraSuperiorVerde: {
    position: 'absolute', width: '100%', height: '100%', borderRadius: 15,
    shadowColor: '#3ce43e',
    shadowOffset: { width: -3, height: -3 },
    shadowOpacity: 1, shadowRadius: 6,
  },
  sombraInferiorVerde: {
    position: 'absolute', width: '100%', height: '100%', borderRadius: 15,
    shadowColor: '#2fa131',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1, shadowRadius: 6,
  },
  sombraSuperiorPressionadoVerde: {
    position: 'absolute', width: '100%', height: '100%', borderRadius: 15,
    shadowColor: '#2fa131',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 1, shadowRadius: 5,
  },
  sombraInferiorPressionadoVerde: {
    position: 'absolute', width: '100%', height: '100%', borderRadius: 15,
    shadowColor: '#3ce43e',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1, shadowRadius: 5,
  },
});