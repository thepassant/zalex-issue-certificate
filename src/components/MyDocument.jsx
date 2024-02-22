import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { getRequestsTargetRequestData } from "../redux/requests/selectors/RequestSelectors";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    width: "100%",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  emptySpace: {
    height: 230,
  },
  text: {
    fontSize: "24in",
  },
});

const MyDocument = ({ requestDataToDownload }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
        wrap={false}
        creator="Bassant Ahmed"
        producer="Zalex inc."
      >
        <View style={styles.section}>
          <Text styles={styles.text}>
            Reference Number: {requestDataToDownload.reference_no}
          </Text>
          <Text styles={styles.text}>
            Status: {requestDataToDownload.status}
          </Text>
          <Text styles={styles.text}>
            Address to: {requestDataToDownload.address_to}
          </Text>
          <Text styles={styles.text}>
            Issued on: {requestDataToDownload.issued_on}
          </Text>
          <Text styles={styles.text}>
            Purpose: {requestDataToDownload.purpose}
          </Text>
        </View>
        <View style={styles.emptySpace} />
        <View style={styles.section}>
          <Text>Zalex inc.</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
