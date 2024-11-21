import { Image, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { useState } from 'react';

function App() {
  const [cep, setCep] = useState('');
  const [resultado, setResultado] = useState('');
  const [error, setError] = useState('');

  // Função para consultar o CEP
  async function ConsultarCep() {
    // Validar se o CEP tem 8 números
    if (cep.length !== 8 || isNaN(cep)) {
      setError('CEP inválido! Deve ter 8 números.');
      setResultado('');
      return;
    }
    
    try {
      // Realiza a requisição à API
      const req = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const retorno = await req.json();

      // Verifica se houve erro na resposta
      if (retorno.erro) {
        setError('CEP não encontrado!');
        setResultado('');
      } else {
        setResultado(`Endereço: ${retorno.logradouro}`);
        setError('');
      }
    } catch (err) {
      // Caso ocorra algum erro (problema de conexão, etc.)
      setError('Erro na consulta do CEP.');
      setResultado('');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.titulo}>Consulta CEP</Text>
      <Image
        style={styles.img}
        source={{
          uri: 'https://viacep.com.br/estatico/images/bt_doar_pix.png.pagespeed.ce.3xD2cQahH2.png',
        }}
      />

      <View style={styles.form}>
        <TextInput
          placeholder="Digite o Cep..."
          style={styles.TextInput}
          onChangeText={(texto) => setCep(texto)}
          value={cep}
          keyboardType="numeric"  // Limita a entrada para números
        />

        <TouchableOpacity style={styles.btn} onPress={ConsultarCep}>
          <Text style={styles.btnText}>Consultar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        {error ? (
          // Exibe a mensagem de erro, caso haja
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          // Exibe o resultado da consulta
          <Text style={styles.resultado}>{resultado}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

export default App;
