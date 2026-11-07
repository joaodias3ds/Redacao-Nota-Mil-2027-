package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.automirrored.outlined.Announcement
import androidx.compose.material.icons.outlined.AdminPanelSettings
import androidx.compose.material.icons.outlined.CheckCircle
import androidx.compose.material.icons.outlined.People
import androidx.compose.material.icons.outlined.Topic
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.CourseMetrics
import com.example.data.model.ThemeConfig
import com.example.ui.theme.BorderLight
import com.example.ui.theme.DarkCardBg
import com.example.ui.theme.PinkLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun AdminDashboardScreen(
  metrics: CourseMetrics,
  themes: List<ThemeConfig>,
  onCreateTheme: (title: String, category: String, deadline: String) -> Unit,
  modifier: Modifier = Modifier
) {
  val scrollState = rememberScrollState()
  var showNewThemeDialog by remember { mutableStateOf(false) }
  var showBroadcastDialog by remember { mutableStateOf(false) }

  var newThemeTitle by remember { mutableStateOf("") }
  var newThemeCategory by remember { mutableStateOf("Sociedade e Tecnologia") }
  var newThemeDeadline by remember { mutableStateOf("Sexta, 23h59") }

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF9FAFC))
      .verticalScroll(scrollState)
      .padding(horizontal = 20.dp)
      .padding(top = 16.dp, bottom = 100.dp)
  ) {
    // Top Admin Header
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Column {
        Text(
          text = "Secretaria & Gestão Geral",
          color = TextSecondary,
          fontSize = 13.sp
        )
        Text(
          text = "Coordenação Pedagógica",
          color = TextPrimary,
          fontSize = 24.sp,
          fontWeight = FontWeight.Bold
        )
        Text(
          text = "Unidade Central · Cursos Presenciais",
          color = PinkPrimary,
          fontSize = 13.sp,
          fontWeight = FontWeight.Medium
        )
      }

      Box(
        modifier = Modifier
          .size(46.dp)
          .clip(CircleShape)
          .background(PinkPrimary),
        contentAlignment = Alignment.Center
      ) {
        Icon(
          imageVector = Icons.Outlined.AdminPanelSettings,
          contentDescription = null,
          tint = Color.White,
          modifier = Modifier.size(24.dp)
        )
      }
    }

    Spacer(modifier = Modifier.height(20.dp))

    // Key Operational Metrics (Grid 2x2)
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
      MetricBox(
        title = "Alunos Matriculados",
        value = "${metrics.totalStudents}",
        subtext = "Turma Extensivo ENEM",
        modifier = Modifier.weight(1f)
      )
      MetricBox(
        title = "Redações na Semana",
        value = "${metrics.submittedEssaysThisWeek}",
        subtext = "Taxa de entrega: 87.5%",
        modifier = Modifier.weight(1f)
      )
    }

    Spacer(modifier = Modifier.height(12.dp))

    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
      MetricBox(
        title = "Média Geral da Turma",
        value = "${metrics.averageScoreThisWeek} pts",
        subtext = "+42 pts vs mês anterior",
        modifier = Modifier.weight(1f)
      )
      MetricBox(
        title = "Tempo de Retorno",
        value = "${metrics.averageTeacherDays} dias",
        subtext = "Meta: até 3 dias",
        modifier = Modifier.weight(1f)
      )
    }

    Spacer(modifier = Modifier.height(24.dp))

    // Section "Gestão de Temas da Semana"
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Text(
        text = "Temas da Semana",
        color = TextPrimary,
        fontSize = 17.sp,
        fontWeight = FontWeight.Bold
      )

      Button(
        onClick = { showNewThemeDialog = true },
        modifier = Modifier
          .height(36.dp)
          .testTag("btn_admin_new_theme"),
        shape = RoundedCornerShape(18.dp),
        colors = ButtonDefaults.buttonColors(
          containerColor = PinkPrimary,
          contentColor = Color.White
        )
      ) {
        Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
        Spacer(modifier = Modifier.width(4.dp))
        Text("Novo Tema", fontSize = 12.sp, fontWeight = FontWeight.Bold)
      }
    }

    Spacer(modifier = Modifier.height(10.dp))

    // Themes List
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
      themes.forEach { theme ->
        Surface(
          modifier = Modifier.fillMaxWidth(),
          shape = RoundedCornerShape(16.dp),
          color = Color.White,
          border = androidx.compose.foundation.BorderStroke(1.dp, if (theme.isActive) PinkPrimary else BorderLight)
        ) {
          Row(
            modifier = Modifier
              .fillMaxWidth()
              .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
          ) {
            Column(modifier = Modifier.weight(1f)) {
              Row(verticalAlignment = Alignment.CenterVertically) {
                if (theme.isActive) {
                  Box(
                    modifier = Modifier
                      .clip(RoundedCornerShape(8.dp))
                      .background(PinkLight)
                      .padding(horizontal = 8.dp, vertical = 2.dp)
                  ) {
                    Text("TEMA ATIVO", color = PinkPrimary, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                  }
                  Spacer(modifier = Modifier.width(8.dp))
                }
                Text(theme.category, color = TextSecondary, fontSize = 12.sp)
              }
              Spacer(modifier = Modifier.height(4.dp))
              Text(
                text = theme.title,
                color = TextPrimary,
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold
              )
              Spacer(modifier = Modifier.height(2.dp))
              Text("Prazo de entrega: ${theme.deadline}", color = TextSecondary, fontSize = 12.sp)
            }
          }
        }
      }
    }

    Spacer(modifier = Modifier.height(24.dp))

    // Compliance & LGPD Card
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(18.dp),
      color = Color(0xFFFFF0F5)
    ) {
      Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
      ) {
        Icon(
          imageVector = Icons.Outlined.CheckCircle,
          contentDescription = null,
          tint = PinkPrimary,
          modifier = Modifier.size(24.dp)
        )
        Spacer(modifier = Modifier.width(12.dp))
        Column {
          Text(
            text = "Conformidade LGPD & Termos de Menores",
            color = TextPrimary,
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold
          )
          Spacer(modifier = Modifier.height(2.dp))
          Text(
            text = "48 de 48 termos de responsáveis coletados e validados digitalmente.",
            color = TextSecondary,
            fontSize = 12.sp
          )
        }
      }
    }

    Spacer(modifier = Modifier.height(24.dp))

    // Broadcast Announcement Button
    Button(
      onClick = { showBroadcastDialog = true },
      modifier = Modifier
        .fillMaxWidth()
        .height(52.dp)
        .testTag("btn_admin_broadcast"),
      shape = RoundedCornerShape(26.dp),
      colors = ButtonDefaults.buttonColors(
        containerColor = Color(0xFF1E1E24),
        contentColor = Color.White
      )
    ) {
      Icon(Icons.AutoMirrored.Outlined.Announcement, contentDescription = null, modifier = Modifier.size(18.dp))
      Spacer(modifier = Modifier.width(8.dp))
      Text("Disparar Comunicado para Turma", fontSize = 15.sp, fontWeight = FontWeight.SemiBold)
    }
  }

  // Create New Theme Dialog
  if (showNewThemeDialog) {
    AlertDialog(
      onDismissRequest = { showNewThemeDialog = false },
      title = { Text("Cadastrar Novo Tema Semanal", fontWeight = FontWeight.Bold) },
      text = {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
          OutlinedTextField(
            value = newThemeTitle,
            onValueChange = { newThemeTitle = it },
            label = { Text("Título da Proposta ENEM") },
            placeholder = { Text("ex: A inteligência artificial e a preservação da privacidade") },
            modifier = Modifier.fillMaxWidth()
          )
          OutlinedTextField(
            value = newThemeCategory,
            onValueChange = { newThemeCategory = it },
            label = { Text("Eixo Temático") },
            modifier = Modifier.fillMaxWidth()
          )
          OutlinedTextField(
            value = newThemeDeadline,
            onValueChange = { newThemeDeadline = it },
            label = { Text("Prazo de Entrega") },
            modifier = Modifier.fillMaxWidth()
          )
        }
      },
      confirmButton = {
        Button(
          onClick = {
            if (newThemeTitle.isNotBlank()) {
              onCreateTheme(newThemeTitle, newThemeCategory, newThemeDeadline)
              newThemeTitle = ""
              showNewThemeDialog = false
            }
          },
          colors = ButtonDefaults.buttonColors(containerColor = PinkPrimary)
        ) {
          Text("Ativar Tema")
        }
      },
      dismissButton = {
        TextButton(onClick = { showNewThemeDialog = false }) {
          Text("Cancelar", color = TextSecondary)
        }
      }
    )
  }

  // Broadcast Dialog
  if (showBroadcastDialog) {
    var broadcastMsg by remember { mutableStateOf("") }
    AlertDialog(
      onDismissRequest = { showBroadcastDialog = false },
      title = { Text("Enviar Comunicado Oficial") },
      text = {
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
          Text("Este comunicado será exibido no app de todos os alunos e responsáveis da Unidade Central.")
          OutlinedTextField(
            value = broadcastMsg,
            onValueChange = { broadcastMsg = it },
            label = { Text("Mensagem") },
            placeholder = { Text("Ex: Simulado presencial confirmado para sábado às 08h00...") },
            modifier = Modifier.fillMaxWidth()
          )
        }
      },
      confirmButton = {
        Button(
          onClick = { showBroadcastDialog = false },
          colors = ButtonDefaults.buttonColors(containerColor = PinkPrimary)
        ) {
          Text("Enviar Notificação")
        }
      },
      dismissButton = {
        TextButton(onClick = { showBroadcastDialog = false }) {
          Text("Fechar", color = TextSecondary)
        }
      }
    )
  }
}

@Composable
private fun MetricBox(
  title: String,
  value: String,
  subtext: String,
  modifier: Modifier = Modifier
) {
  Surface(
    modifier = modifier.clip(RoundedCornerShape(16.dp)),
    shape = RoundedCornerShape(16.dp),
    color = Color.White,
    border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
    shadowElevation = 1.dp
  ) {
    Column(modifier = Modifier.padding(16.dp)) {
      Text(title, color = TextSecondary, fontSize = 12.sp)
      Spacer(modifier = Modifier.height(6.dp))
      Text(value, color = TextPrimary, fontSize = 22.sp, fontWeight = FontWeight.Bold)
      Spacer(modifier = Modifier.height(4.dp))
      Text(subtext, color = PinkPrimary, fontSize = 11.sp, fontWeight = FontWeight.Medium)
    }
  }
}
