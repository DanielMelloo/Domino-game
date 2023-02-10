legenda:

[ ] -> A fazer

[-] -> Em progresso

[x] -> feito



Emergencia!!!{

[ ] scroll da mesa so funcionna quando clica na parte inferior da tela (Rafael)

[ ] Descrição do passo-a-passo feito no dominó (Daniel/Tathiana/Steffany)

[x] fazer table com scroll (Rafael)

[x] deve indicar quantas rodadas que cada um venceu (Gabriel)

[x] contador de rodadas (Gabriel)

[x] tempo para o bot jogar na hud de opções (Daniel)

[x] criar a opção para selecionar a dificuldade do bot no menu de opções. (Daniel)

[-] menu de "como jogar". (Taty)

[x] Oponente jogando........... nao aparece..... implemetar (Gabriel)

[x] pvb. (Gabriel)

[x] bvb. (Gabriel)

[?] mostrar "drop-zone" (?)

[?] Verificar problema na funçao de criação do SVG - compatibilidade com navegador - peça não gera svg
}


Trabalho de Modelagem Computacional:

Objetivo:

Desenvolver um jogo de dominó iterativo em que:

- um jogador humano possa jogar contra uma máquina (associada a um tipo de estratégia vencedora)

- uma máquina possa jogar contra outra máquina (uma estratégia contra outra)

A interface:

A interface de iteração/visualização deve: 

- permitir que se escolha: dominó de 2 ou 3 extremidades, valor máximo para o encaixe. No dominó tradicional, tem 2 extremidades e o valor máximo é 6.

- permitir que o jogador humano possa ver as suas peças.

- permitir que a quantidade de peças da máquina possa ser disponibilizada.

- permitir que a quantidade de peças da parte que não foi distribuida entre os jogadores no inicio possa ser disponibilizada.

- permitir que as peças utilizadas estejam visiveis, com a sequência de encaixe disponível.

- disponibilizar para o jogador as peças que ele poderia utilizar para o encaixe.

- caso não tenha nenhuma peça, o jogador deve poder escolher uma do lote de pecas disponiveis até que encontre uma que encaixe.  Observar que as peças não são visíveis, mas já foram sorteadas.

- o jogador possa escolher em qual extremidade ele irá encaixar a peça. Se o jogador propuser uma peça que não pode ser encaixada na extremidade sinalizada, um erro deve ser reportado.

- caso o jogador/maquina não puder jogar mais nenhuma peça, isto deve ser sinalizado e a vez passa para o oponente.

- deve indicar quando o jogo acaba que é quando o jogador/maquina já tiver jogado todas as suas peças ou quando nenhum dos dois consegue mais enciaxar peças nas extremidades.

- deve contabilizar os pontos de cada um e indicar o vencedor da rodada. Quem vence é quem tiver menos pontos na soma dos valores dos dominós que ainda estiverem com cada um. O vencedor recebe os pontos do oponente. Haverá empate se ambos obtiverem os mesmos pontos. 

- deve indicar quem vence o jogo, ou uma partida, que é o 1o. que chegar a 100 pontos acumulados em todas as rodadas.

- deve indicar uma curva que mostra os pontos de cada um a cada rodada para uma partida.

- deve indicar quantas partidas cada um venceu.

O jogo/mais de uma partida:

O jogo pode começar quando um número de peças iguais é distribuido para cada um. As peças que sobrarem fazem parte de um lote de peças disponíveis que podem ser utilizadas quando for necessário. Cada jodador só pode ver as suas peças e aquelas que já foram utilizadas.

O jogo inicia com o jogador/maquina que tiver:

1) a maior peça entre as peças que possuam valores iguais.

2) caso nem o jogador ne a máquina tenha alguma peça que satisfaça a condição 1, a peça de maior soma de pontos deve ser utilizada.

Caso a condição inicial seja da máquina, ela disponibiliza a peça.

Caso a condição inicial seja do humano, a peça correta deve ser utilizada. Se uma peça que seja incorreta seja proposta, um erro deve ser sinalizado.

Quando o jogador/maquina tenha colocado uma peça encaixada na lista visível de peças já jogadas, a vez passa para o oponente, até o jogo acabar.

       Grupos para implementação:

Para implementar o jogo são constituidos 3 grupos:

Grupo 1 de Visualização.

Grupo 2 de Estratégia.

Grupo 3 de Análise Matemática.

Vizualização: se preocupa com a parte visual e iterativa do jogo.

Estratégia: define uma estratégia que é qual peça jogar e onde encaixar. O objetivo é ganhar o jogo, ou seja, fazer com que no final, os pontos da estratégia sejam os menores possíveis. Pode-se criar estratégias diferentes. Uma estratégia que poderia ser difficil para o jogador humano seria aquela em que a máquina conheça além de suas peças, também a do seu oponente.

Análise Matemática: deve poder indicar algumas condições que possam definir uma situação ou fazer cálculos para poder ajudar os outros grupos a codificar uma determinada operação ou gerar um objeto a ser visualizado.

Como deve ser implementado:

Um site do Google Sites deve ser criado que contenha:

Uma página associada a cada Grupo onde o desnvolvimento da sua parte está sendo feito.

Uma página associada ao Trabalho que implementa o jogo de dominó.

A interface dinâmica do jogo deve ser feita usando a linguagem javascript, associada à meta-linguagem HTML (versâo 5), com seus complementos CSS (para poder definir estilos) e SVG (para poder desenhar objetos gráficos e fazer animações)

A página da cada grupo deve conter:

- o objetivo do grupo

- os participantes e quem faz o que

- os códigos com comentários (implementação computacional) ou as fórmulas com explicações (análise matemática).

- a interface ou testes associados a componentes ou códigos.

     

caso dê tempo { 

[ ] inserir função de movimentação da hand do bot

[ ] drag no mobile

[ ] Fazer hand com scroll no mobile

}






