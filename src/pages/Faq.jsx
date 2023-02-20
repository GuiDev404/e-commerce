import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import Header from '../components/Header';

const FAQ_DATA = [
  { title: '¿Es funcional?', description: 'Si pero al ser una aplicacion de practica, los datos son ficticios.' },
  { title: '¿Guardamos algun dato?', description: 'Los datos son guardados de manera local y al cerrar sesion son eliminados.' },
]

const Faq = () => {
  return (
    <Box>
      <Header title='FAQ' />

      <Accordion>
        {FAQ_DATA.map((faq) => (
          <AccordionItem key={faq.title}>
            <h2>
              <AccordionButton>
                <Box as='span' fontWeight='bold' flex='1' textAlign='left'>
                  {faq.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{faq.description}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

export default Faq