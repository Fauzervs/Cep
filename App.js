import {Image, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {styles} from './style';
import { useState} from "react";

function App(){

const [cep, SetCep] =useState("");
const [resultado, setResultado] = useState("");

async function ConsultarCep(){

const req = await fetch("https://viacep.com.br/ws/" + cep + "/json/")
const retorno = await req.json()

setResultado("Endereço: " + retorno.logradouro);
}

   return <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content"/>
    <Text style={styles.titulo}>Consulta CEP</Text>
    <Image style={styles.img} source={
      {uri:"https://viacep.com.br/estatico/images/bt_doar_pix.png.pagespeed.ce.3xD2cQahH2.png"}
    }/>

    <View style={styles.form}>
      <TextInput placeholder="Digete o Cep..."
      style={styles.TextInput}
      onChangeText={texto => SetCep(texto)}/>
      
      <TouchableOpacity style={styles.btn} onPress={ConsultarCep}>
        <Text style={styles.btnText}>Consultar</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.form}> 
      <Text style={styles.resultado}>{resultado}</Text>
    </View>
        </SafeAreaView>
  }

  export default App;
