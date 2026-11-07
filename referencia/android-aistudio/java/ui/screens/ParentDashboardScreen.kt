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
import androidx.compose.material.icons.outlined.CheckCircle
import androidx.compose.material.icons.outlined.FamilyRestroom
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.material.icons.outlined.Phone
import androidx.compose.material.icons.outlined.Security
import androidx.compose.material.icons.outlined.VerifiedUser
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedButton
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
import com.example.data.model.ParentViewData
import com.example.ui.theme.BorderLight
import com.example.ui.theme.PinkLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun ParentDashboardScreen(
  data: ParentViewData,
  modifier: Modifier = Modifier
) {
  val scrollState = rememberScrollState()
  var showTermsDialog by remember { mutableStateOf(false) }
  var showContactDialog by remember { mutableStateOf(false) }

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF9FAFC))
      .verticalScroll(scrollState)
      .padding(horizontal = 20.dp)
      .padding(top = 16.dp, bottom = 100.dp)
  ) {
    // Header
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Column {
        Text(
          text = "Área do Responsável",
          color = TextSecondary,
          fontSize = 13.sp
        )
        Text(
          text = "Olá, ${data.parentName}",
          color = TextPrimary,
          fontSize = 24.sp,
          fontWeight = FontWeight.Bold
        )
        Text(
          text = "Acompanhando: ${data.studentName} (${data.studentAge} anos)",
          color = PinkPrimary,
          fontSize = 14.sp,
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
          imageVector = Icons.Outlined.FamilyRestroom,
          contentDescription = null,
          tint = Color.White,
          modifier = Modifier.size(24.dp)
        )
      }
    }

    Spacer(modifier = Modifier.height(20.dp))

    // Term of Responsibility & Under 18 Card
    Surface(
      modifier = Modifier
        .fillMaxWidth()
        .clip(RoundedCornerShape(18.dp))
        .clickable { showTermsDialog = true }
        .testTag("parent_term_card"),
      shape = RoundedCornerShape(18.dp),
      color = Color(0xFFFFF0F5),
      border = androidx.compose.foundation.BorderStroke(1.dp, PinkPrimary.copy(alpha = 0.3f))
    ) {
      Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
      ) {
        Icon(
          imageVector = Icons.Outlined.VerifiedUser,
          contentDescription = null,
          tint = PinkPrimary,
          modifier = Modifier.size(28.dp)
        )
        Spacer(modifier = Modifier.width(12.dp))
        Column(modifier = Modifier.weight(1f)) {
          Text(
            text = data.termStatus,
            color = TextPrimary,
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold
          )
          Spacer(modifier = Modifier.height(2.dp))
          Text(
            text = "Consentimento LGPD validado em ${data.termDate}. Toque para ver termos.",
            color = TextSecondary,
            fontSize = 12.sp
          )
        }
      }
    }

    Spacer(modifier = Modifier.height(18.dp))

    // Progress Overview (Score & Presence)
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
      Surface(
        modifier = Modifier
          .weight(1f)
          .clip(RoundedCornerShape(18.dp)),
        shape = RoundedCornerShape(18.dp),
        color = Color.White,
        border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
        shadowElevation = 1.dp
      ) {
        Column(modifier = Modifier.padding(16.dp)) {
          Text("Última Redação", color = TextSecondary, fontSize = 12.sp)
          Spacer(modifier = Modifier.height(4.dp))
          Text(
            text = "${data.latestScore}",
            color = PinkPrimary,
            fontSize = 28.sp,
            fontWeight = FontWeight.Bold
          )
          Spacer(modifier = Modifier.height(4.dp))
          Text(
            text = "+${data.latestScore - data.initialScore} pts de evolução",
            color = Color(0xFF10B981),
            fontSize = 11.sp,
            fontWeight = FontWeight.SemiBold
          )
        }
      }

      Surface(
        modifier = Modifier
          .weight(1f)
          .clip(RoundedCornerShape(18.dp)),
        shape = RoundedCornerShape(18.dp),
        color = Color.White,
        border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
        shadowElevation = 1.dp
      ) {
        Column(modifier = Modifier.padding(16.dp)) {
          Text("Presença Presencial", color = TextSecondary, fontSize = 12.sp)
          Spacer(modifier = Modifier.height(4.dp))
          Text(
            text = "91,6%",
            color = TextPrimary,
            fontSize = 28.sp,
            fontWeight = FontWeight.Bold
          )
          Spacer(modifier = Modifier.height(4.dp))
          Text(
            text = "11 de 12 aulas no mês",
            color = TextSecondary,
            fontSize = 11.sp
          )
        }
      }
    }

    Spacer(modifier = Modifier.height(20.dp))

    // Teacher's Observation Card
    Text(
      text = "Parecer do Professor Titular",
      color = TextPrimary,
      fontSize = 16.sp,
      fontWeight = FontWeight.Bold
    )
    Spacer(modifier = Modifier.height(8.dp))
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(18.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight)
    ) {
      Column(modifier = Modifier.padding(16.dp)) {
        Text(
          text = data.teacherObservation,
          color = TextPrimary,
          fontSize = 14.sp,
          lineHeight = 20.sp
        )
        Spacer(modifier = Modifier.height(10.dp))
        Text(
          text = "— Prof. Guilherme Ramos · Sala 14",
          color = PinkPrimary,
          fontSize = 12.sp,
          fontWeight = FontWeight.SemiBold
        )
      }
    }

    Spacer(modifier = Modifier.height(20.dp))

    // Recent Alerts & Notifications
    Text(
      text = "Avisos Recentes da Turma",
      color = TextPrimary,
      fontSize = 16.sp,
      fontWeight = FontWeight.Bold
    )
    Spacer(modifier = Modifier.height(8.dp))
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(18.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight)
    ) {
      Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
      ) {
        data.alerts.forEach { alert ->
          Row(verticalAlignment = Alignment.Top) {
            Icon(
              imageVector = Icons.Outlined.CheckCircle,
              contentDescription = null,
              tint = PinkPrimary,
              modifier = Modifier
                .size(18.dp)
                .padding(top = 2.dp)
            )
            Spacer(modifier = Modifier.width(10.dp))
            Text(
              text = alert,
              color = TextPrimary,
              fontSize = 13.sp,
              lineHeight = 18.sp
            )
          }
        }
      }
    }

    Spacer(modifier = Modifier.height(28.dp))

    // Direct Action to Contact Secretariat
    Button(
      onClick = { showContactDialog = true },
      modifier = Modifier
        .fillMaxWidth()
        .height(52.dp)
        .testTag("btn_parent_contact"),
      shape = RoundedCornerShape(26.dp),
      colors = ButtonDefaults.buttonColors(
        containerColor = PinkPrimary,
        contentColor = Color.White
      )
    ) {
      Icon(
        imageVector = Icons.Outlined.Phone,
        contentDescription = null,
        modifier = Modifier.size(18.dp)
      )
      Spacer(modifier = Modifier.width(8.dp))
      Text(
        text = "Falar com a Coordenação Pedagógica",
        fontSize = 15.sp,
        fontWeight = FontWeight.SemiBold
      )
    }
  }

  if (showTermsDialog) {
    AlertDialog(
      onDismissRequest = { showTermsDialog = false },
      title = { Text("Termo de Responsabilidade e Menoridade") },
      text = {
        Text("Eu, Carlos Silva, responsável legal por Marina Silva (menor de 18 anos), declaro consentir com a participação presencial nas aulas, envio digital de redações e recebimento de relatórios quinzenais de desempenho e frequência pelo canal oficial do curso.")
      },
      confirmButton = {
        TextButton(onClick = { showTermsDialog = false }) {
          Text("Entendido", color = PinkPrimary)
        }
      }
    )
  }

  if (showContactDialog) {
    AlertDialog(
      onDismissRequest = { showContactDialog = false },
      title = { Text("Coordenação & Secretaria") },
      text = {
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
          Text("WhatsApp da Coordenação: (11) 98765-4321")
          Text("Atendimento a Pais: Seg a Sex das 09h às 18h | Sáb das 08h às 13h")
          Text("Local: Unidade Central, Sala da Coordenação")
        }
      },
      confirmButton = {
        TextButton(onClick = { showContactDialog = false }) {
          Text("Fechar", color = PinkPrimary)
        }
      }
    )
  }
}
