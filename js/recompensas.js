 // Seleção de opções
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.option-card').forEach(c => {
                    c.classList.remove('selected');
                });
                card.classList.add('selected');
            });
        });
        
        // Simulação de resgate
        document.querySelector('.button-reward').addEventListener('click', () => {
            const selectedOption = document.querySelector('.option-card.selected .option-name').textContent;
            alert(`Recompensa "${selectedOption}" resgatada com sucesso!`);
        });