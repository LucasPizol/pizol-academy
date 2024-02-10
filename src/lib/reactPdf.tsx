import React from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
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

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  titleView: {
    padding: 10,
    borderBottom: "0.5px solid black",
  },
  titleText: {
    fontSize: 24,
    color: "#363636",
    textAlign: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 18,
    borderBottom: "0.5px solid #363636",
    paddingBottom: 4,
    marginBottom: 8
  },
  text: {
    fontSize: 14,
    color: "#363636",
    textAlign: "justify",
  },
  column: {
    flex: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
});
