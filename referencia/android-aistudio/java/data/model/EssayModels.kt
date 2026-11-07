package com.example.data.model

enum class UserRole(val label: String, val badge: String) {
  ALUNO("Aluno", "Marina Silva"),
  PROFESSOR("Professor", "Prof. Guilherme Ramos"),
  RESPONSAVEL("Responsável", "Carlos Silva (Pai)"),
  ADMIN("Administrador", "Coordenação Pedagógica")
}

enum class CorrectionStep(val label: String, val description: String) {
  ENVIADA("Enviada", "recebemos seu texto"),
  IA("Pré-correção da IA", "estimativa disponível"),
  PROFESSOR("Revisão do professor", "Em andamento · prazo de até 3 dias"),
  PRONTA("Correção oficial", "Você será avisado quando estiver pronta")
}

data class CompetencyScore(
  val code: String,          // e.g., "C1", "C2"
  val name: String,          // e.g., "Norma culta", "Tema e repertório"
  val score: Int,            // e.g., 160
  val maxScore: Int = 200,
  val delta: String = "+20", // e.g., "+20", "+40", "atenção"
  val isAttention: Boolean = false,
  val feedback: String = ""
)

data class RepertoryCard(
  val id: String,
  val badge: String,         // e.g., "CONCEITO · COMPETÊNCIA 2"
  val title: String,         // e.g., "Modernidade líquida"
  val authorYear: String,    // e.g., "Zygmunt Bauman, 2000"
  val description: String,
  val howToUse: String,
  val source: String,
  val isSaved: Boolean = false
)

data class EssayDraft(
  val theme: String = "Saúde mental dos jovens na era digital",
  val text: String = "",
  val lastSaved: String = "Salvo há 2 min",
  val targetLines: Int = 30,
  val minRecommendedLines: Int = 7
)

data class EssayEvaluation(
  val theme: String = "Saúde mental dos jovens na era digital",
  val submissionTime: String = "Hoje, 09:12 · Versão 1",
  val totalEstimatedScore: Int = 760,
  val maxScore: Int = 1000,
  val currentStep: CorrectionStep = CorrectionStep.PROFESSOR,
  val competencies: List<CompetencyScore> = listOf(
    CompetencyScore("C1", "Norma culta", 160, 200, "+20"),
    CompetencyScore("C2", "Tema e repertório", 120, 200, "atenção", isAttention = true, feedback = "Seu repertório apareceu pouco desenvolvido. Que tal ligar uma ideia sociológica ao tema?"),
    CompetencyScore("C3", "Argumentação", 160, 200, "+40"),
    CompetencyScore("C4", "Coesão", 160, 200, "+20"),
    CompetencyScore("C5", "Proposta de intervenção", 160, 200, "+40")
  ),
  val attentionCompetency: String = "C2",
  val attentionPoint: String = "Seu repertório apareceu pouco desenvolvido. Que tal ligar uma ideia sociológica ao tema?",
  val structuralDetails: String = "Introdução consistente com apresentação da tese. D1 necessita de legitimação teórica com repertório sociológico produtivo. Proposta de intervenção com agente claro."
)

data class EvolutionItem(
  val code: String,  // "R1", "R2", ...
  val score: Int,
  val theme: String,
  val date: String
)

data class StudentProfile(
  val name: String = "Marina",
  val fullName: String = "Marina Silva",
  val email: String = "marina@email.com",
  val isUnder18: Boolean = true,
  val parentTermsAccepted: Boolean = true,
  val courseName: String = "Turma Extensivo ENEM - Presencial",
  val schedule: String = "Sábados, 08h00 às 12h30",
  val room: String = "Unidade Central - Sala 14",
  val teacher: String = "Prof. Guilherme Ramos",
  val presenceCount: Int = 11,
  val totalClasses: Int = 12
)

// Data models for Professor Flow
data class TeacherEssayItem(
  val id: String,
  val studentName: String,
  val studentClass: String,
  val theme: String,
  val submittedAt: String,
  val text: String,
  val aiScore: Int,
  val officialScore: Int? = null,
  val status: CorrectionStep,
  val c1: Int = 160,
  val c2: Int = 120,
  val c3: Int = 160,
  val c4: Int = 160,
  val c5: Int = 160,
  val teacherNotes: String = "",
  val isApprovedByTeacher: Boolean = false
)

data class ClassRollStudent(
  val id: String,
  val name: String,
  val rollNumber: String,
  val isPresent: Boolean = true
)

// Data models for Responsável Flow
data class ParentViewData(
  val parentName: String = "Carlos Silva",
  val studentName: String = "Marina Silva",
  val studentAge: Int = 17,
  val termStatus: String = "Termo LGPD & Menoridade Aceito",
  val termDate: String = "01/08/2026",
  val latestScore: Int = 760,
  val initialScore: Int = 640,
  val attendanceRate: String = "91,6% (11/12 aulas)",
  val teacherObservation: String = "A Marina tem demonstrado excelente dedicação nas oficinas de sábado e grande evolução na proposta de intervenção.",
  val alerts: List<String> = listOf(
    "Nova estimativa de IA disponível para a redação de Saúde Mental.",
    "Presença confirmada no último sábado (04/Out) às 08h05.",
    "Plantão presencial agendado para o próximo sábado às 11h30."
  )
)

// Data models for Admin Flow
data class CourseMetrics(
  val totalStudents: Int = 48,
  val submittedEssaysThisWeek: Int = 42,
  val averageScoreThisWeek: Int = 742,
  val attendancePercentage: Int = 92,
  val pendingTeacherReviews: Int = 6,
  val averageTeacherDays: Double = 1.8
)

data class ThemeConfig(
  val id: String,
  val title: String,
  val category: String,
  val deadline: String,
  val isActive: Boolean = true
)
