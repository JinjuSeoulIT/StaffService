import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography, } from "@mui/material";
import Image from "next/image";
import updates from "../data/updates.json";

export default function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          <center>업데이트</center>
        </Typography>

        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Image
            src="/flow_diagram_in_a_redux_app.gif"
            alt="Redux App Flow Diagram"
            width={600} // 이미지의 실제 너비에 맞게 조정해주세요.
            height={400} // 이미지의 실제 높이에 맞게 조정해주세요.
          />
        </Box>
        
        <center>flow diagram in a redux app</center>

        <List>
          {updates.map((item: {content: string }, index) => (
            
              
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                secondary={
                  <Typography component="span" color="text.secondary">
                    {item.content}
                  </Typography>
                }
              />
            </ListItem>
                
                
          ))}
        </List>
      </Container>
    </Box>
  );
}
