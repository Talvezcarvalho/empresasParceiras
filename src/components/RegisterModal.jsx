import React from 'react';

import {
  X,
  MessageCircle,
  Mail,
  ExternalLink,
  Users,
  Building2,
} from 'lucide-react';

export const RegisterModal = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]

        flex
        items-center
        justify-center

        bg-black/70
        backdrop-blur-sm

        px-4
        py-8
      "
      onClick={onClose}
    >
      <div
        className="
          relative

          w-full
          max-w-2xl

          overflow-hidden

          rounded-2xl
          border
          border-slate-200
          dark:border-[#26334f]

          bg-white
          dark:bg-[#111827]

          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* detalhe azul superior */}
        <div className="h-1.5 w-full bg-sky-600" />

        {/* botão fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="
            absolute
            right-5
            top-5

            flex
            h-9
            w-9
            items-center
            justify-center

            rounded-full

            text-slate-500
            hover:bg-slate-100
            hover:text-slate-900

            dark:text-slate-400
            dark:hover:bg-white/10
            dark:hover:text-white

            transition
          "
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-8 lg:p-10">

          {/* cabeçalho */}
          <div className="pr-10">
            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-sky-600
              "
            >
              Clube de parceiros
            </span>

            <h2
              className="
                mt-3

                text-3xl
                sm:text-4xl

                font-semibold
                tracking-[-0.04em]

                text-slate-950
                dark:text-white
              "
            >
              Quer fazer parte?
            </h2>

            <p
              className="
                mt-4
                max-w-xl

                text-sm
                sm:text-base

                leading-relaxed

                text-slate-600
                dark:text-slate-400
              "
            >
              Empresas interessadas em oferecer condições ou
              benefícios especiais à nossa comunidade escolar
              podem entrar em contato conosco pelos canais abaixo.
            </p>
          </div>

          {/* aviso de exclusividade */}
          <div
            className="
              mt-7

              flex
              items-start
              gap-3

              rounded-xl

              border
              border-sky-600/20

              bg-sky-600/5
              dark:bg-sky-600/10

              p-4
            "
          >
            <Users
              className="
                mt-0.5
                h-5
                w-5
                shrink-0
                text-sky-600
              "
            />

            <div>
              <strong
                className="
                  block
                  text-sm
                  text-slate-900
                  dark:text-white
                "
              >
                Portal de uso exclusivo
              </strong>

              <p
                className="
                  mt-1
                  text-sm
                  leading-relaxed
                  text-slate-600
                  dark:text-slate-400
                "
              >
                Os benefícios divulgados neste portal são
                destinados exclusivamente aos pais, responsáveis
                e funcionários do Colégio Adventista de Toledo,
                conforme as condições estabelecidas por cada
                empresa parceira.
              </p>
            </div>
          </div>

          {/* contatos */}
          <div className="mt-8">

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-slate-400
              "
            >
              Entre em contato
            </span>

            <div className="mt-3 grid gap-3 sm:grid-cols-3">

              {/* WhatsApp */}
              <a
                href="https://wa.me/5545999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group

                  flex
                  items-center
                  gap-3

                  rounded-xl

                  border
                  border-slate-200
                  dark:border-[#26334f]

                  p-4

                  hover:border-sky-600/50
                  hover:bg-sky-600/5

                  transition
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-lg
                    bg-sky-600/10
                    text-sky-600
                  "
                >
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <span
                    className="
                      block
                      text-xs
                      text-slate-500
                    "
                  >
                    WhatsApp
                  </span>

                  <strong
                    className="
                      block
                      truncate
                      text-sm

                      text-slate-900
                      dark:text-white
                    "
                  >
                    (45) 99999-9999
                  </strong>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/colegioadventistadetoledo/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group

                  flex
                  items-center
                  gap-3

                  rounded-xl

                  border
                  border-slate-200
                  dark:border-[#26334f]

                  p-4

                  hover:border-sky-600/50
                  hover:bg-sky-600/5

                  transition
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-lg
                    bg-sky-600/10
                    text-sky-600
                  "
                >
                </div>

                <div className="min-w-0">
                  <span
                    className="
                      block
                      text-xs
                      text-slate-500
                    "
                  >
                  </span>

                  <strong
                    className="
                      block
                      truncate
                      text-sm

                      text-slate-900
                      dark:text-white
                    "
                  >
                    @seuinstagram
                  </strong>
                </div>
              </a>

              {/* E-mail */}
              <a
                href="mailto:contato@exemplo.com"
                className="
                  group

                  flex
                  items-center
                  gap-3

                  rounded-xl

                  border
                  border-slate-200
                  dark:border-[#26334f]

                  p-4

                  hover:border-sky-600/50
                  hover:bg-sky-600/5

                  transition
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-lg
                    bg-sky-600/10
                    text-sky-600
                  "
                >
                  <Mail className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <span
                    className="
                      block
                      text-xs
                      text-slate-500
                    "
                  >
                    E-mail
                  </span>

                  <strong
                    className="
                      block
                      truncate
                      text-sm

                      text-slate-900
                      dark:text-white
                    "
                  >
                    contato@exemplo.com
                  </strong>
                </div>
              </a>

            </div>
          </div>

          {/* Colégio */}
          <div
            className="
              mt-8
              pt-6

              border-t
              border-slate-200
              dark:border-[#26334f]

              flex
              flex-col
              gap-4

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-start gap-3">
              <Building2
                className="
                  mt-0.5
                  h-5
                  w-5
                  shrink-0
                  text-sky-600
                "
              />

              <div>
                <strong
                  className="
                    block
                    text-sm

                    text-slate-900
                    dark:text-white
                  "
                >
                  Colégio Adventista de Toledo
                </strong>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Para informações sobre matrículas, ensino e
                  demais assuntos institucionais, acesse nossos
                  canais oficiais.
                </p>
              </div>
            </div>

            <a
              href="https://toledo.educacaoadventista.org.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                shrink-0
                items-center
                gap-2

                text-xs
                font-bold
                uppercase
                tracking-[0.1em]

                text-sky-600

                hover:text-sky-500

                transition
              "
            >
              Site oficial

              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};