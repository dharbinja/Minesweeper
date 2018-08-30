from django.apps import AppConfig


class MinesweeperConfig(AppConfig):
    name = 'minesweeper'

    # Hook up our signals
    def ready(self):
        import minesweeper.signals
