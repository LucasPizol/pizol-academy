import React from "react";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { ActivityDocument } from "../services/reactPdfService";

type Props = {
  data: ActivityDocument;
};

export const MyDocument = ({ data }: Props) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{data.title}</Text>
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.subtitle}>Resumo</Text>
          <Text style={styles.text}>{data.resume}</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Recursos Utilizados</Text>
          <Text style={styles.text}>{data.recurses}</Text>
        </View>

        <View>
          <Text style={styles.subtitle}>Guia</Text>
          <Text style={styles.text}>{data.guide}</Text>
        </View>

        <View>
          <Text style={styles.subtitle}>Habilidades</Text>
          {data.abilities.map((ability, index) => (
            <Text style={styles.text} key={ability.id}>
              {index + 1} - {ability.name}
            </Text>
          ))}
        </View>

        <View>
          <Text style={styles.subtitle}>Tempo total em segundos</Text>
          <Text style={styles.text}>{data.total_time}</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Status</Text>
          <Text style={styles.text}>
            {data.isActive ? "Ativo" : "Desativado"}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

Font.register({
  family: "Poppins",
  fonts: [
    { src: "./files/Poppins-Regular.ttf" },
    { src: "./files/Poppins-Bold.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontFamily: "Poppins",
  },
  titleView: {
    padding: 10,
    backgroundColor: "#4383FF",
    width: "100%",
    borderRadius: 6,
    marginBottom: 12,
  },
  titleText: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 2,
    fontWeight: "bold",
    color: "#363636",
  },
  text: {
    fontSize: 12,
    color: "#363636",
    textAlign: "justify",
  },
});
