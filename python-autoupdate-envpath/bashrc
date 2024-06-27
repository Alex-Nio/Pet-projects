# https://github.com/Tredecies/git_mode
alias g="source ~/git_mode/git_mode_enter"
alias ge="source ~/git_mode/git_mode_exit"
alias q="source ~/git_mode/git_mode_exit"

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# https://github.com/nvm-sh/nvm
export NVM_DIR="$HOME/.nvm"
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -f "/c/Users/__your-profile__/bin/win-sudo/s/path.sh" ] && source "/c/Users/__your-profile__/bin/win-sudo/s/path.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Функция для установки PATH в зависимости от версии Python установленной через pyenv
# https://github.com/pyenv/pyenv
set_python_path() {
    local current_version
    current_version="$(python -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}")')"

    local scripts_path
    scripts_path="$HOME/.pyenv/pyenv-win/versions/$current_version/Scripts"

    # Проверяем, существует ли каталог Scripts для текущей версии Python
    if [ -d "$scripts_path" ]; then
        # Устанавливаем переменную PYTHON_SCRIPTS_PATH
        export PYTHON_SCRIPTS_PATH="$scripts_path"

        # Обновляем PATH
        export PATH="$scripts_path:$PATH"

        echo "PYTHON_SCRIPTS_PATH установлен в: $scripts_path"
    else
        echo "Каталог Scripts для версии Python $current_version не найден."
    fi
}

# Вызываем функцию при каждом запуске оболочки
set_python_path
