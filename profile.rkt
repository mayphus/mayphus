#lang racket

(require racket/match)

(provide current-line field profile projects workshop-line)

(define profile
  '((name . "mayphus")
    (tagline . "maker of software, hardware, mechanical, and occasional chaos.")
    (website . "https://mayphus.org/")
    (current . "building small personal systems with Racket, Emacs, infra, and web surfaces")
    (workshop . ("emacs"
                 "racket"
                 "cloudflare workers"
                 "tiny computers"
                 "small scripts that became projects"))))

(define projects
  '((emacs . "personal Emacs system generated from Racket")
    (infra . "home and network infrastructure control plane")
    (rime-config . "Rime input method config and web tools")
    (mayphus.org . "public website family")
    (pkg . "local machine package notes and helpers")))

(define (field key)
  (match (assoc key profile)
    [(cons _ value) value]
    [#f (error 'field "missing profile field: ~a" key)]))

(define (english-list items)
  (match items
    ['() ""]
    [(list one) one]
    [(list one two) (format "~a and ~a" one two)]
    [_ (format "~a, and ~a"
               (string-join (drop-right items 1) ", ")
               (last items))]))

(define (workshop-line)
  (format "currently somewhere between ~a"
          (english-list (field 'workshop))))

(define (current-line)
  (field 'current))
