from django.apps import AppConfig


class MinesweeperConfig(AppConfig):
    name = 'minesweeper'

    # Hook up our post created game signal
    def ready(self):
        import minesweeper.signals
